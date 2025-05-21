import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { economy } from '../../data/mongodb.js'; // Your MongoDB model

const COOLDOWN_TIME = 3600000; // 1 hour in milliseconds

const workMessages = [
  "You repaired a customer's brakes and received $",
  "You changed the oil on a car and earned $",
  "You replaced a car's battery and got paid $",
  "You detailed a luxury vehicle and made $",
  "You installed a new exhaust system and received $",
  "You tuned up a high-performance engine and earned $",
  "You fixed a flat tire for a stranded motorist and got $",
  "You painted a car's hood and made $",
  "You replaced worn-out spark plugs and earned $",
  "You balanced the wheels on a sports car and received $",
  "You repaired a car's transmission and got paid $",
  "You installed a new sound system in a vehicle and made $",
  "You replaced a damaged bumper and received $",
  "You upgraded a vehicle's suspension and earned $",
  "You cleaned and polished alloy wheels and got $",
  "You repaired a car's air conditioning system and received $",
  "You replaced a cracked windshield and made $",
  "You serviced the cooling system on a sedan and earned $",
  "You adjusted the alignment on a drifting car and got $",
  "You installed new headlights on a truck and received $",
  "You repaired a vintage car's carburetor and earned $",
  "You restored a classic car's interior and made $",
  "You wrapped a vehicle with a custom vinyl design and got paid $",
  "You installed a turbocharger on a sports car and earned $",
  "You flushed the brake system on a family van and received $",
  "You installed new performance tires and got $",
  "You repainted a car's fender and made $",
  "You welded a cracked exhaust pipe and earned $",
  "You calibrated a vehicle's digital dashboard and received $",
  "You fixed a car's power windows and got paid $",
  "You removed scratches from a car's paintwork and earned $",
  "You replaced the timing belt on a truck and made $",
  "You upgraded a car's performance brakes and received $",
  "You restored the leather seats in a luxury car and earned $",
  "You diagnosed and fixed an engine misfire and got $",
  "You installed a spoiler on a sports car and made $",
  "You repaired an SUV's power steering system and received $",
  "You upgraded the rims on a drift car and got paid $",
  "You replaced the fuel pump on a vintage car and earned $",
  "You cleaned and waxed a car's exterior and received $",
  "You fixed a car's tail lights and got $",
  "You serviced a luxury SUV's suspension and earned $",
  "You polished the headlights on a classic car and made $",
  "You replaced a blown fuse in a truck and received $",
  "You installed a roll cage in a rally car and earned $",
  "You restored a damaged spoiler and got paid $",
  "You adjusted the camber on a street racer and earned $",
  "You rewired the electronics in a custom car and made $",
  "You installed a nitrous oxide system in a drag car and received $",
  "You refurbished a damaged alloy wheel and got $",
  "You upgraded the sound system in a luxury sedan and earned $",
  "You rebuilt a damaged engine block and received $",
  "You replaced a clogged air filter in a truck and got paid $",
  "You repaired a leaky radiator and earned $",
  "You installed a lift kit on an off-road truck and made $",
  "You reupholstered the seats in a convertible and received $",
  "You aligned the wheels on a pickup truck and earned $",
  "You replaced a damaged drive shaft in an SUV and got $",
  "You installed underglow lights on a tuner car and made $",
  "You repaired a loose muffler and earned $",
  "You adjusted the fuel injection system on a muscle car and received $",
  "You cleaned the engine bay of a show car and got paid $",
  "You upgraded a car's interior lighting and earned $",
  "You replaced a faulty alternator in a delivery van and made $",
  "You installed a backup camera in a family SUV and received $",
  "You calibrated the steering rack on a race car and earned $",
  "You restored the paint job on a collector's vehicle and got $",
  "You removed dents from a car's bodywork and made $",
  "You fixed the navigation system in a luxury car and earned $",
  "You installed a custom spoiler on a rally car and received $",
  "You serviced the gearbox of a manual transmission car and got paid $",
  "You replaced worn wiper blades on a sedan and earned $",
  "You restored a damaged grille on a classic vehicle and made $",
  "You applied a ceramic coating to a high-end car and received $",
  "You rebuilt the differential on an all-wheel-drive car and earned $",
  "You swapped out a faulty thermostat in a compact car and got $",
  "You repaired a broken ignition switch on a coupe and made $",
  "You cleaned the undercarriage of a mud-covered truck and received $",
  "You installed side skirts on a drift car and earned $",
  "You upgraded the brake pads on a sports coupe and got $",
  "You fixed the heating system in a minivan and made $",
  "You replaced a damaged spoiler on a race car and received $",
  "You tuned the ECU on a turbocharged vehicle and earned $",
  "You polished the chrome trim on a vintage sedan and got paid $",
  "You repaired the horn on a delivery truck and earned $",
  "You balanced the tires on a modified hatchback and made $",
  "You installed roof racks on a family SUV and received $",
  "You rebuilt the suspension on a lowrider and earned $",
  "You restored the dashboard of a classic muscle car and got $",
  "You adjusted the clutch on a rally vehicle and made $",
  "You fixed a leaking fuel line on a race car and earned $"
];


// Get a random work message and earnings
function getRandomWork() {
  const message = workMessages[Math.floor(Math.random() * workMessages.length)];
  const earnings = Math.floor(Math.random() * 801) + 200; // $200–$1000
  return { message, earnings };
}

export const data = new SlashCommandBuilder()
  .setName('work')
  .setDescription('Earn currency with a cooldown');

export async function execute(interaction) {
  await interaction.deferReply({ ephemeral: false });
  const userId = interaction.user.id;

  let profile = await economy.findOne({ userId });
  if (!profile) {
    profile = await economy.create({ userId, balance: 0, workCooldown: null });
  }

  const now = Date.now();
  const lastClaim = profile.workCooldown ? new Date(profile.workCooldown).getTime() : 0;
  const timeSinceLastClaim = now - lastClaim;


  if (profile.workCooldown && timeSinceLastClaim < COOLDOWN_TIME) {
    const timeRemaining = COOLDOWN_TIME - timeSinceLastClaim;
    const hours = Math.floor(timeRemaining / 3600000);
    const minutes = Math.floor((timeRemaining % 3600000) / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);

    const embed = new EmbedBuilder()
      .setColor('#6c78fc')
      .setDescription(`⏳ You cannot work for another **${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}, and ${seconds} second${seconds !== 1 ? 's' : ''}**.`);

    return interaction.editReply({ embeds: [embed] });
  }

  // Generate earnings and message
  const { message, earnings } = getRandomWork();

  // Update profile
  profile.balance += earnings;
  profile.workCooldown = new Date(now);
  await profile.save();

  const embed = new EmbedBuilder()
    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
    .setDescription(`${message}${earnings}`)
    .setColor('#6c78fc')
    .setFooter({ text: `Reply #${Math.floor(Math.random() * 999999)}` });

  await interaction.editReply({ embeds: [embed] });
}
