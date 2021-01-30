const Discord = require("discord.js");
const { ReactionRole } = require("reaction-role");
const dotenv = require("dotenv");

dotenv.config();
botSecretToken = process.env.BOT_TOKEN;

const client = new ReactionRole(botSecretToken);

client.on("ready", () => {
  // Set bot status to: "Watching for a &help in chat"
  client.user.setActivity("for a &help in chat", { type: "WATCHING" });
});

// For server auth
client.on("guildMemberAdd", (member) => {
  let guild = member.guild; // Reading property `guild` of guildmember object.
  let memberTag = member.user.tag; // GuildMembers don't have a tag property, read property user of guildmember to get the user object from it
  member.roles.add("698841628856811601");
  const channel = client.channels.cache.get("698868628459749407");
  setTimeout(() => {
    channel.send(
      "Welcome to **" +
        guild.name +
        `**, <@${member.user.id}>! You are our ` +
        guild.memberCount +
        `th coder! Please use the command "&confirm {participant | organiser} {school name} {full name}" in this chat to verify your identity before proceeding.`
    );
  }, 2000);
});

client.on("message", (receivedMessage) => {
  if (receivedMessage.author == client.user) {
    // Prevent bot from responding to its own messages
    return;
  }

  if (receivedMessage.channel.id == "698868628459749407") {
    // Does a linear search on all messages in verification channel
    let n = receivedMessage.content.indexOf("&"); // Get index of &
    if (n == -1) {
      // Case where & is not found
      return;
    } else {
      if (receivedMessage.content.slice(n + 1, n + 8) == "confirm") {
        // Looks at the 7 characters after the & to see if they are "confirm"
        confirmCommand(receivedMessage);
      } else {
        return;
      }
    }
  } else if (receivedMessage.content.startsWith("&")) {
    processCommand(receivedMessage);
  }
});

const processCommand = (receivedMessage) => {
  let fullCommand = receivedMessage.content.substr(1); // Remove the leading &
  let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

  switch (primaryCommand) {
    case "help":
      helpCommand(arguments, receivedMessage);
      break;
    case "test":
      testCommand(arguments, receivedMessage);
      break;
    case "committee":
      commCommand(arguments, receivedMessage);
      break;
    case "poll":
      pollCommand(arguments, receivedMessage);
      break;
    case "react":
      reactCommand(arguments, receivedMessage);
      break;
    default:
      receivedMessage.channel.send(
        "I don't understand the command. Try `&help`"
      );
  }
};

/**
 * Different roles:
 * Workshop (June Event) 698841625627197441
 * Workshop (March Event) 803645952866385940
 * Workshop (FOSSASIA) 803646041906872370
 * Quality Assurance 803646515025281034
 * Emcees 803646503365246986
 * Resource Management 803646523681406977
 * Competition 803646520297521172
 * Entertainment and Lucky Draw 698841626348486737
 * Games 698841627606777868
 * Website and Media 698841629867507752
 */
const pollCommand = async (arguments, receivedMessage) => {
  // Create an embed message (for aesthetics)
  const poll = new Discord.MessageEmbed()
    .setColor("#FF9900")
    .setTitle("Committee Sign Ups")
    .setDescription(
      "React with your desired role emoji to sign up! See the full description for each committee by sending &committee {insert committee emoji here} in #workbench."
    )
    .addFields(
      {
        name: "Workshop (June Event)",
        value:
          "☀️ Organising and planning for all the workshops within the June event",
      },
      {
        name: "Workshop (March Event)",
        value:
          "🌱 Organising and planning for all the workshops within the March event",
      },
      {
        name: "Workshop (FOSSASIA)",
        value:
          "🔓 Organising and planning for all the workshops within the FOSSASIA BBCS workshop slots",
      },
      {
        name: "Quality Assurance",
        value: "🔎 Ensuring UX/UI quality and organising dry runs",
      },
      {
        name: "Emcees",
        value: "🎙️ Hosting the March and June events",
      },
      {
        name: "Resource Management",
        value: "📦 Procuring giveaway prizes and trinkets for participants",
      },
      {
        name: "Competition",
        value:
          "🏆 In charge mainly of the AI Challenge on the last day of the June event. They might also be called to think of and execute challenges in between the 2 main events",
      },
      {
        name: "Entertainment and Lucky Draw",
        value:
          "🎉 In charge of all entertainment and lucky draw efforts for the March and June events",
      },
      {
        name: "Games",
        value:
          "🎮 Organising and planning for all the game-related activities within the March and June Event",
      },
      {
        name: "Website and Media",
        value: "🖥️ Maintaining the BBCS website and social media pages",
      }
    )
    .setFooter("Problems with the bot? Mention @DHS Isaac C in #workbench");

  message = await receivedMessage.channel.send(poll);
};

const reactCommand = async (arguments, receivedMessage) => {
  // Set options for reaction roles
  const juneEvent = client.createOption(
    "☀️",
    "Given you the Workshop (June Event) role. This committee would be in charge of organising and planning for all the workshops within the June Event. This includes (and is not limited to) the following items: \nConducting and scheduling trial runs for the various workshops \nEnsuring that the workshops content are of quality \nLiaising with other committees to plan for the June Event\nEnsure that the workshops on the actual June Event is smooth running",
    "Your role has been removed.",
    ["698841625627197441"]
  );
  const marchEvent = client.createOption(
    "🌱",
    "Given you the Workshop (March Event) role. This committee would be in charge of organising and planning for all the workshops within the March Event. This includes (and is not limited to) the following items: \nConducting and scheduling trial runs for the various workshops \nEnsuring that the workshops content are of quality \nLiaising with other committees to plan for the March Event\nEnsure that the workshops on the actual March Event is smooth running",
    "Your role has been removed.",
    ["803645952866385940"]
  );
  const fossasia = client.createOption(
    "🔓",
    "Given you the Workshop (FOSSASIA) role. This committee would be in charge of organising and planning for all the workshops within the FOSSASIA BBCS Workshop Slots. This includes (and is not limited to) the following items: \nConducting and scheduling trial runs for the various workshops \nEnsuring that the workshops content are of quality \nLiaising with FOSSASIA  on the allocation of workshops on the FOSSASIA event.\nEnsure that the BBCS workshops during FOSSASIA is running smoothly",
    "Your role has been removed.",
    ["803646041906872370"]
  );
  const qa = client.createOption(
    "🔎",
    "Given you the Quality Assurance role. This is a newly created committee which would be in charge of design and ensuring that anything that BBCS puts out is of quality and consistency. This includes (and is not limited to) the following items: \nReviewing every piece of work that is put forth by BBCS, ensuring that it keeps consistent with our previous designs and wording \nDesigning posters and banners, etc",
    "Your role has been removed.",
    ["803646515025281034"]
  );
  const emcees = client.createOption(
    "🎙️",
    "Given you the Emcees role. You will be hosting the events and introducing the various speakers. You might also be tasked with dancing. Don't ask.",
    "Your role has been removed.",
    ["803646503365246986"]
  );
  const resource = client.createOption(
    "📦",
    "Given you the Resource Management role. This is a rebranding of the previous logistics committee which would be in charge of not only logistics of running the events but also human management.",
    "Your role has been removed.",
    ["803646523681406977"]
  );
  const competition = client.createOption(
    "🏆",
    "Given you the Competition role. This is a newly created committee which would be in charge mainly of the AI Challenge on the last day of the June Event. They might also be called to think of and execute challenges in between the 2 main events.",
    "Your role has been removed.",
    ["803646520297521172"]
  );
  const entertainment = client.createOption(
    "🎉",
    "Given you the Entertainment and Lucky Draw role. This committee would be in charge of all entertainment and lucky draw efforts for the March and June Events. This includes (and is not limited to) the following items: \nHosting lucky draws on the last days of the 2 main events\nSuggesting and executing entertainment ideas to spice up the liveliness of BBCS as a whole",
    "Your role has been removed.",
    ["698841626348486737"]
  );
  const games = client.createOption(
    "🎮",
    "Given you the Games role. This committee would be in charge of organising and planning for all the games (-related) activities within the March and June Event. This includes (and is not limited to) the following items: \nPlanning for and executing of the CodeCombat Tournament (to be held on one of the main events)\nSuggesting other games which we can play during the event’s allocated slot for games",
    "Your role has been removed.",
    ["698841627606777868"]
  );
  const media = client.createOption(
    "🖥️",
    "Given you the Website and Media role. This committee would be in charge of maintaining the BBCS Website and BBCS Instagram. This includes (and is not limited to) the following items: \nUpdating the website (when needed)\nPosting pre-event/event posts on Instagram. \nLiaising with CTE-STEM relating to social media collaborations, works",
    "Your role has been removed.",
    ["698841629867507752"]
  );

  client.createMessage(
    arguments[0],
    "698967005369466951",
    2,
    [],
    juneEvent,
    marchEvent,
    fossasia,
    qa,
    emcees,
    resource,
    competition,
    entertainment,
    games,
    media
  );

  client = await client.reInit();
};

const commCommand = (arguments, receivedMessage) => {
  if (arguments.length > 0) {
    committee = arguments[0];
    switch (committee) {
      case "☀️":
        receivedMessage.channel.send(
          "The Workshop (June Event) committee would be in charge of organising and planning for all the workshops within the June Event. This includes (and is not limited to) the following items: \nConducting and scheduling trial runs for the various workshops \nEnsuring that the workshops content are of quality \nLiaising with other committees to plan for the June Event\nEnsure that the workshops on the actual June Event is smooth running"
        );
        break;
      case "🌱":
        receivedMessage.channel.send(
          "The Workshop (March Event) committee would be in charge of organising and planning for all the workshops within the March Event. This includes (and is not limited to) the following items: \nConducting and scheduling trial runs for the various workshops \nEnsuring that the workshops content are of quality \nLiaising with other committees to plan for the March Event\nEnsure that the workshops on the actual March Event is smooth running"
        );
        break;
      case "🔓":
        receivedMessage.channel.send(
          "The Workshop (FOSSASIA) committee would be in charge of organising and planning for all the workshops within the FOSSASIA BBCS Workshop Slots. This includes (and is not limited to) the following items: \nConducting and scheduling trial runs for the various workshops \nEnsuring that the workshops content are of quality \nLiaising with FOSSASIA  on the allocation of workshops on the FOSSASIA event.\nEnsure that the BBCS workshops during FOSSASIA is running smoothly"
        );
        break;
      case "🔎":
        receivedMessage.channel.send(
          "Quality Assurance is a newly created committee which would be in charge of design and ensuring that anything that BBCS puts out is of quality and consistency. This includes (and is not limited to) the following items: \nReviewing every piece of work that is put forth by BBCS, ensuring that it keeps consistent with our previous designs and wording \nDesigning posters and banners, etc"
        );
        break;
      case "🎙️":
        receivedMessage.channel.send(
          "The Emcees will be hosting the events and introducing the various speakers."
        );
        break;
      case "📦":
        receivedMessage.channel.send(
          "Resource Management is a rebranding of the previous logistics committee which would be in charge of not only logistics of running the events but also human management."
        );
        break;
      case "🏆":
        receivedMessage.channel.send(
          "The Competition committee would be in charge mainly of the AI Challenge on the last day of the June Event. They might also be called to think of and execute challenges in between the 2 main events."
        );
        break;
      case "🎉":
        receivedMessage.channel.send(
          "The Entertainment and Lucky Draw committee would be in charge of all entertainment and lucky draw efforts for the March and June Events. This includes (and is not limited to) the following items: \nHosting lucky draws on the last days of the 2 main events\nSuggesting and executing entertainment ideas to spice up the liveliness of BBCS as a whole"
        );
        break;
      case "🎮":
        receivedMessage.channel.send(
          "The Games committee would be in charge of organising and planning for all the game-related activities within the March and June Event. This includes (and is not limited to) the following items: \nPlanning for and executing of the CodeCombat Tournament (to be held on one of the main events)\nSuggesting other games which we can play during the event’s allocated slot for games",
          "Your role has been removed."
        );
        break;
      case "🖥️":
        receivedMessage.channel.send(
          "The Website and Media committee would be in charge of maintaining the BBCS Website and BBCS Instagram. This includes (and is not limited to) the following items: \nUpdating the website (when needed)\nPosting pre-event/event posts on Instagram. \nLiaising with CTE-STEM relating to social media collaborations, works"
        );
        break;
      default:
        receivedMessage.channel.send("Did you use the right emoji?");
    }
  } else {
    receivedMessage.channel.send("Try &committee {emoji} instead.");
  }
};

const confirmCommand = (receivedMessage) => {
  receivedMessage.member.roles.remove("698841628856811601");
  console.log(receivedMessage.content);
  receivedMessage.author.send(
    "Thank you <@" +
      receivedMessage.author.id +
      ">! You can now access the other channels."
  );
};

const helpCommand = (arguments, receivedMessage) => {
  receivedMessage.channel.send(
    "I'm a bot that does BBCS stuff! My creator is still learning how to make effective and secure discord/chat bots, so if you find any errors please mention @DHS Isaac C in #workbench and describe the error in detail.\n\nYou might be wondering why this help message is so short. That's because my only purpose currently is to facilitate committee signups. More functions will be added at a later date."
  );
};

const testCommand = (arguments, receivedMessage) => {
  receivedMessage.channel.send(
    "Hi <@" + receivedMessage.author.id + ">, this is a test message"
  );
};

client.init();
