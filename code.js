const {
  shell
} = require('electron')
const Discord = require("discord.js");
const {
  Client,
  RichEmbed
} = require("discord.js");
var bot = new Discord.Client({
  disableEveryone: true
});
var guilds_list;
var channels_list;
var tk = "";
var u = 1;
var z = 0;
var t;
var log = 0;
var online = false;

const default_author = "Yomna";
const default_author_img = "https://media.discordapp.net/attachments/651877464234131476/651877503794937879/icon_tiny.png";
const default_author_link = "";
const default_title = "EMBEDER TITLE";
const default_title_link = "https://github.com/Yxmna";
const default_description = "Here, the description. you can use the discord markdown, you can mention someone, role or channel you can also use custom emojis and line break.";
const default_field_title = "a field title";
const default_field_value = "a field value";
const default_background = "";
const default_thumbnail = "https://media.discordapp.net/attachments/651877464234131476/651877501961895956/icon.png";
const default_footer = "Embeder by Yomna";
const default_footer_img = "https://media.discordapp.net/attachments/651877464234131476/651877503794937879/icon_tiny.png";
const default_date = "";
const default_color = "#00b16a";
const default_avatar = "https://media.discordapp.net/attachments/592132872316518400/652125384694956032/default_avatar.png";

function load() {
  reset();
  timer();
  console.log("Client loaded!");
};

function timer() {
  update_client();
  setTimeout("timer()", 1000);
};

function invite() {
  shell.openExternal(`https://discordapp.com/oauth2/authorize?client_id=${document.getElementById("id").value}&scope=bot&permissions=8`, "_blank");
}

function login() {
  // logging();
  tk = document.getElementById("token").value;

  bot.login(tk).catch((err) => {
    errLogin();
  });
  console.log(`Logging..`);
  return t = setInterval("logging()", 500);


};

function logging() {
  switch (log) {
    case 0:
      document.getElementById("login").innerHTML = "Logging"
      break;
    case 1:
      document.getElementById("login").innerHTML = "Logging."
      break;
    case 2:
      document.getElementById("login").innerHTML = "Logging.."
      break;
    case 3:
      document.getElementById("login").innerHTML = "Logging..."
      log = -1;
      break;
  }
  log++;
}


bot.on('debug', console.log);

function errLogin() {
  clearInterval(t);
  document.getElementById("login").innerHTML = "Retry"
  document.getElementById("login").classList.add("error");
}

bot.on("ready", () => {
  clearInterval(t);
  console.log(`${bot.user.username} is ready`);
  online = true;
  update_client();
  update_guilds();
  bot.user.setActivity("the skies", {
    type: "WATCHING"
  });
});

function reset() {
  document.getElementById("author_input").value = default_author;
  document.getElementById("author_link_input").value = default_author_link;
  document.getElementById("author_img_input").value = default_author_img;
  document.getElementById("title_input").value = default_title;
  document.getElementById("title_link_input").value = default_title_link;
  document.getElementById("description_input").value = default_description;
  document.getElementById("footer_input").value = default_footer;
  document.getElementById("footer_img_input").value = default_footer_img;
  document.getElementById("date_input").value = default_date;
  document.getElementById("background_input").value = default_background;
  document.getElementById("thumbnail_input").value = default_thumbnail;
  document.getElementById("color").value = default_color;
  document.getElementById("field_title0").value = default_field_title;
  document.getElementById("field_value0").value = default_field_value;
  update_client();
  console.log("Client reset!")
};

function createField() {
  z += 1
  u += 1
  //CREATE FIELD
  var div = document.createElement("div");
  div.setAttribute("class", "field");
  var block1 = document.createElement("div");
  block1.setAttribute("class", "block-5");
  var block2 = document.createElement("div");
  block2.setAttribute("class", "block-5");
  var textarea_field = document.createElement('textarea');
  var textarea_value = document.createElement('textarea');
  textarea_field.innerHTML = "Another field title";
  textarea_value.innerHTML = "Another field value";
  textarea_field.setAttribute("id", "field_title" + z);
  textarea_value.setAttribute("id", "field_value" + z);
  //INSERT FIELD
  block1.insertBefore(textarea_value, block1.lastChild);
  block2.insertBefore(textarea_field, block2.lastChild);
  div.insertBefore(block1, div.lastChild)
  div.insertBefore(block2, div.lastChild)
  var fields1 = document.getElementById('fields1');
  fields1.insertBefore(div, fields1.lastChild);
  console.log("Field added!")
};

function send() {
  //CREATE EMBED
  const q = new Discord.RichEmbed()
    .setColor(color)
    .setAuthor(name, author_img, author_link)
    .setTitle(title)
    .setURL(title_link)
    .setImage(background)
    .setTimestamp(date)
    .setThumbnail(thumbnail)
    .setFooter(footer, footer_img)
    .setDescription(description);
  var i = 0
  do {
    if (document.getElementById("field_title" + i).value !== "" && document.getElementById("field_value" + i).value !== "") {
      q.addField(document.getElementById("field_title" + i).value, document.getElementById("field_value" + i).value);
    }
    i++
  } while (i < u);
  //SEND EMBED
  bot.channels.get(channel_selected.id).send(q).then(function() {
    console.log("Embed sent!");
  });
};

function update_client() {
  //CLEAR FIELDS
  var clear = document.getElementById('fields2');
  while (clear.firstChild) {
    clear.removeChild(clear.firstChild);
  }
  //UPDATE FIELDS
  var i = 0
  do {
    if (document.getElementById("field_title" + i).value !== "" && document.getElementById("field_value" + i).value !== "") {
      var div = document.createElement('div');
      div.setAttribute("class", "field")
      var field = document.createElement('h1');
      var value = document.createElement('h2');
      field.textContent = document.getElementById("field_title" + i).value
      value.textContent = document.getElementById("field_value" + i).value
      div.insertBefore(value, div.lastChild)
      div.insertBefore(field, div.lastChild)
      //INSERT
      var fields2 = document.getElementById('fields2');
      fields2.appendChild(div, fields2.lastChild);
    }
    i++
  } while (i < u);
  //UPDATE DISPLAY
  if (document.getElementById("background_input").value == "") {
    document.getElementById("embed").classList.remove("active_background");
  } else {
    document.getElementById("embed").classList.add("active_background");
  }
  if (document.getElementById("thumbnail_input").value == "") {
    document.getElementById("embed").classList.remove("active_thumbnail");
  } else {
    document.getElementById("embed").classList.add("active_thumbnail");
  }
  if (document.getElementById("author_img_input").value == "") {
    document.getElementById("author_img_u").classList.add("void");
  } else {
    document.getElementById("author_img_u").classList.remove("void");
  }
  if (document.getElementById("author_input").value == "") {
    document.getElementById("author").classList.add("void");
  } else {
    document.getElementById("author").classList.remove("void");
  }
  if (document.getElementById("author_u").value == "") {
    document.getElementById("author_u").classList.remove("url");
  } else {
    document.getElementById("author_u").classList.add("url");
  }
  if (document.getElementById("title_link_input").value == "") {
    document.getElementById("title_u").classList.remove("url");
  } else {
    document.getElementById("title_u").classList.add("url");
  }
  if (document.getElementById("description_input").value == "") {
    document.getElementById("description").classList.add("void");
  } else {
    document.getElementById("description").classList.remove("void");
  }
  if (document.getElementById("title_input").value == "") {
    document.getElementById("title").classList.add("void");
  } else {
    document.getElementById("title").classList.remove("void");
  }
  if (document.getElementById("footer_img_input").value == "" || document.getElementById("footer_input").value == "") {
    document.getElementById("footer_img_u").classList.add("void");
  } else {
    document.getElementById("footer_img_u").classList.remove("void");
  }
  if (document.getElementById("footer_input").value != "" && document.getElementById("date_input").value != "") {
    document.getElementById("dot").classList.remove("void");
  } else {
    document.getElementById("dot").classList.add("void");
  }
  if (document.getElementById("footer_input").value == "" && document.getElementById("date_input").value == "") {
    document.getElementById("footer").classList.add("void");
  } else {
    document.getElementById("footer").classList.remove("void");
  }
  //GET INPUT TEXTS
  name = document.getElementById("author_input").value;
  author_link = document.getElementById("author_link_input").value;
  author_img = document.getElementById("author_img_input").value;
  title = document.getElementById("title_input").value;
  title_link = document.getElementById("title_link_input").value;
  description = document.getElementById("description_input").value;
  footer = document.getElementById("footer_input").value;
  footer_img = document.getElementById("footer_img_input").value;
  date = document.getElementById("date_input").value;
  background = document.getElementById("background_input").value;
  thumbnail = document.getElementById("thumbnail_input").value;
  color = document.getElementById("color").value;
  if (color == "#ffffff") {
    color = "#feffff";
  }
  //UPDATE TEXTS
  document.getElementById("author_u").textContent = name;
  document.getElementById("author_img_u").src = author_img;
  document.getElementById("title_u").textContent = title;
  document.getElementById("description_u").textContent = description;
  document.getElementById("footer_u").textContent = footer;
  document.getElementById("footer_img_u").src = footer_img;
  document.getElementById("date_u").textContent = date;
  document.getElementById("background_u").src = background;
  document.getElementById("thumbnail_u").src = thumbnail;
  //UPDATE COLOR
  var em = document.getElementsByClassName("embed");
  for (let i = 0; i < em.length; i++) {
    em[i].style.borderLeftColor = color;
  }
  //UPDATE BOT STATUS & CHANNELS SELECTION
  if (online) {
    guild_selected = bot.guilds.get(document.getElementById("guilds").value);
    channel_selected = bot.channels.get(document.getElementById("channels").value);
    document.getElementById("bot_name").innerHTML = bot.user.username;
    if (bot.user.avatarURL == "") {
      document.getElementById("bot_avatar").src = default_avatar;
    } else {
      document.getElementById("bot_avatar").src = bot.user.avatarURL;
    }
    document.getElementById("discriminator").innerHTML = bot.user.discriminator;
    document.getElementById("servers").innerHTML = bot.guilds.size;
    if (bot.guilds.size > 1) {
      document.getElementById("s").innerHTML = "SERVERS: ";
    } else {
      document.getElementById("s").innerHTML = "SERVER: ";
    }
    document.getElementById("login").classList.add("connected");
    document.getElementById("login").setAttribute("onClick", "");
    document.getElementById("login").innerHTML = "Connected"
  }
  // console.log("Client updated!");
};

function update_guilds() {
  //CLEAR SELECT
  var select1 = document.getElementById("guilds");
  select1.innerHTML = "";
  //GET GUILDS LISTS
  guilds_list = bot.guilds.map(function(x) {
    return x.name
  });
  guilds_id_list = bot.guilds.map(function(x) {
    return x.id
  });
  //UPDATE SELECT
  for (var i = 0; i < guilds_list.length; i++) {
    var opt1 = document.createElement('option');
    opt1.value = guilds_id_list[i];
    opt1.innerHTML = guilds_list[i];
    select1.appendChild(opt1);
  };
  console.log("Guilds updated!");
  update_channels();
};

function update_channels() {
  //CLEAR SELECT
  var select2 = document.getElementById("channels");
  select2.innerHTML = "";
  //GET TEXTS CHANNELS LIST
  guild_selected = bot.guilds.get(document.getElementById("guilds").value);
  channels_list = guild_selected.channels.map(function(x) {
    if (x.type !== "category") {
      return x.name
    } else {
      return ""
    }
  }).filter(function(y) {
    return y != "";
  });
  channels_id_list = guild_selected.channels.map(function(x) {
    if (x.type !== "category") {
      return x.id
    } else {
      return ""
    }
  }).filter(function(y) {
    return y != "";
  });
  //UPDATE SELECT
  for (var i = 0; i < channels_list.length; i++) {
    var opt2 = document.createElement('option');
    opt2.value = channels_id_list[i];
    opt2.innerHTML = "# " + channels_list[i];
    select2.appendChild(opt2);
  };
  console.log("Channels updated!");
};
