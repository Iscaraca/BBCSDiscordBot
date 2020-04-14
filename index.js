const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    // Set bot status to: "Watching for a &help in chat"
    client.user.setActivity("for a &help in chat", {type: "WATCHING"})
})

client.on("guildMemberAdd", (member) => {
    let guild = member.guild; // Reading property `guild` of guildmember object.
    let memberTag = member.user.tag; // GuildMembers don't have a tag property, read property user of guildmember to get the user object from it
    member.roles.add("698841628856811601")
    const channel = client.channels.cache.get('698868628459749407')
    setTimeout(() => { channel.send("Welcome to **" + guild.name+ `**, <@${member.user.id}>! You are our ` + guild.memberCount + `th coder! Please verify your identity first (your name and school, and your role in BuildingBloCS 2020 as a participant or organiser) and read the message in #hello-world before you can view other channels`); }, 2000);  
});


client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.channel.id == '698868628459749407') { // Does a linear search on all messages in verification channel
        let n = receivedMessage.content.indexOf('&') // Get index of &
        if (n == -1) { // Case where & is not found
            return
        }
        else {
            if (receivedMessage.content.slice(n+1, n+8)=="confirm") { // Looks at the 7 characters after the & to see if they are "confirm"
                confirmCommand(receivedMessage)
            }
            else {
                return
            }
        }
    } else if (receivedMessage.content.startsWith("&")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading &
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "test") {
        testCommand(arguments, receivedMessage)
    } else if (primaryCommand == "committees") {
        commCommand(arguments, receivedMessage)
    } else if (primaryCommand == "role") {
        roleCommand(arguments, receivedMessage)
    } else if (primaryCommand == "0192") {
        adminCommand(arguments, receivedMessage)
    } else if (primaryCommand == "1029") {
        adminNoCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `&help`")
    }
}

function roleCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.author.send("Giving you the role of " + arguments + "...")
        if (arguments == "workshop"){
            receivedMessage.member.roles.add('698841625627197441')
            receivedMessage.author.send("Assignment complete!")
        } else if (arguments == "coursemology"){
            receivedMessage.member.roles.add('698841627610972162')
            receivedMessage.author.send("Assignment complete!")
        } else if (arguments == "baking"){
            receivedMessage.member.roles.add('698844527972319253')
            receivedMessage.author.send("Assignment complete!")
        } else if (arguments == "media"){
            receivedMessage.member.roles.add('698841629867507752')
            receivedMessage.author.send("Assignment complete!")
        } else if (arguments == "entertainment"){
            receivedMessage.member.roles.add('698841626348486737')
            receivedMessage.author.send("Assignment complete!")
        } else if (arguments == "games"){
            receivedMessage.member.roles.add('698841627606777868')
            receivedMessage.author.send("Assignment complete!")
        } else if (arguments == "lucky"){
            receivedMessage.member.roles.add('698841630530076752')
            receivedMessage.author.send("Assignment complete!")
        } else {
            receivedMessage.author.send('Try &role [role] instead. Roles are workshop, coursemology, baking, media, games, lucky, and entertainment.')
        }
    } else {
        receivedMessage.author.send("I didn't understand that. Try &role [role] instead. Roles are workshop, coursemology, baking, media, games, lucky, and entertainment.")
    }
    receivedMessage.delete();
}

function commCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you're interested in " + arguments + ", eh?")
        if (arguments == "workshop"){
            receivedMessage.channel.send("The workshop committee is focused on settling pre-events and workshops that happen throughout the year.")
        } else if (arguments == "coursemology"){
            receivedMessage.channel.send("The coursemology committee creates questions on https://buildingblocs.coursemology.org/ for people to do computational thinking questions in python.")
        } else if (arguments == "baking"){
            receivedMessage.channel.send("The baking committee draws parallels from baking to algorithmic and programmatic concepts in a unique way.")
        } else if (arguments == "media"){
            receivedMessage.channel.send("The media committee is in charge of the BBCS instagram account and inter-school communication, for trendy lads.")
        } else if (arguments == "entertainment"){
            receivedMessage.channel.send("The entertainment committee LOVES playing Dance Dance Revolution. Let's spread the joy by dancing!")
        } else if (arguments == "games"){
            receivedMessage.channel.send("Games play games. Are you a gamer? Join and play potato pirates!")
        } else if (arguments == "lucky"){
            receivedMessage.channel.send("If you love destroying everyone with your insane luck, join lucky comm and give others a chance at winning prizes ~~or rigging the game to make you win all the time~~!")
        } else {
            receivedMessage.channel.send("Sorry what? That ain't a comm. The comms are workshop, coursemology, baking, media, games, lucky, and entertainment.")
        }
    }
    else{
        receivedMessage.channel.send("Try &committees [committee]. Committees are workshop, coursemology, baking, media, games, lucky, and entertainment.")
    }
}

function confirmCommand(receivedMessage) {
    receivedMessage.member.roles.remove('698841628856811601')
    receivedMessage.author.send("Thank you <@"+receivedMessage.author.id+">! You can now access the other channels.")
}

function adminCommand(arguments, receivedMessage) {
    receivedMessage.member.roles.add('699069532152528978')
    receivedMessage.delete();
}

function adminNoCommand(arguments, receivedMessage) {
    receivedMessage.member.roles.remove('699069532152528978')
    receivedMessage.delete();
}


function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments + ". Oi <@" + '248473681066590208' + "> help leh.")
    } else {
        receivedMessage.channel.send("I am currently equipped with these javascript switch cases:\n\n&help\nSends this message! For personalised help, try &help [question].\n\n&committees\nDescribes the committees in BBCS and what they do.\n\n&role [role]\nAssigns you a role. To find out what roles are available simply type &role\n\n&test\nTests the bot so you know isaac didnt mess up again")
    }
}

function testCommand(arguments, receivedMessage) {
    receivedMessage.channel.send("hi <@"+receivedMessage.author.id+">, this is a test message")
}

bot_secret_token = ""

client.login(bot_secret_token)
