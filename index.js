const express = require('express');
const path = require('path');
// const generatePassword = require('password-generator');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


//App Globals=================================================
var fetch = require('node-fetch');
var router = express.Router();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//====================================== Google APIs====================================================================
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content)
{
    if (err)
    {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback)
{
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token)
    {
        if (err)
        {
            getNewToken(oauth2Client, callback);
        } else
        {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback)
{
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code)
    {
        rl.close();
        oauth2Client.getToken(code, function (err, token)
        {
            if (err)
            {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token)
{
    try
    {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err)
    {
        if (err.code != 'EEXIST')
        {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth)
{
    var calendar = google.calendar('v3');
    calendar.events.list({
        auth: auth,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    }, function (err, response)
    {
        if (err)
        {
            console.log('The API returned an error: ' + err);
            return;
        }
        var events = response.items;
        if (events.length == 0)
        {
            console.log('No upcoming events found.');
        } else
        {
            console.log('Upcoming 10 events:');
            for (var i = 0; i < events.length; i++)
            {
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
            }
        }
    });
}

//======================================================================================================================

//Firebase
let firebase = require("firebase");

//End App Globals=============================================
let config = {
    apiKey: "AIzaSyA1JB3yBWizGxgFvi-yS2LkGpxyflytshQ",
    authDomain: "swehw4.firebaseapp.com",
    databaseURL: "https://swehw4.firebaseio.com",
    projectId: "swehw4",
    storageBucket: "swehw4.appspot.com",
    messagingSenderId: "1080437453033"
};
firebase.initializeApp(config);

let database = firebase.database();
//Global Data Structures======================================

//Keeps track user within the cache
let users;
let appointments = [];

//Load from FireBase flag
let loadFromFireBase = true;

//End of Data Structures======================================


//Global Functions============================================
//End of Global Functions=====================================

//Class Declarations==========================================
class User
{
    constructor(name, lastName, uName, uEmail)
    {
        this.username = uName;
        this.name = name;
        this.lastName = lastName;
        this.email = uEmail;
        this.friendUIDS = new Set();
        this.appointments = new Map();
    }

    getName()
    {
        return this.name;
    }

    getFullName()
    {
        return this.name + " " + this.lastName;
    }

    setName(name)
    {
        this.name = name;
    }

    getLastName()
    {
        return this.lastName;
    }

    setLastName(name)
    {
        this.lastName = name;
    }

    makeSerializable()
    {
        let newUser = new User(this.getName(), this.getLastName(), this.getUserName(), this.getEmail());
        newUser.friendUIDS = Array.from(this.getFriendUIDS());
        newUser.appointments = Array.from(this.getAppointments());

        return newUser;
    }

    getEmail()
    {
        return this.email;
    }

    getUserName()
    {
        return this.username;
    }

    addFriendID(friendID)
    {
        this.friendUIDS.add(friendID);
    }

    isFriend(friendID)
    {
        let fID = friendID.toLowerCase();
        for (let friend of this.friendUIDS)
        {
            if (friend === fID)
            {
                return true;
            }
        }
        return false;
    }

    setEmail(email)
    {
        this.email = email;
    }

    removeFriendID(friendID)
    {
        this.friendUIDS.delete(friendID);
    }

    getFriendUIDS()
    {
        return this.friendUIDS;
    }

    addAppointment(appointment)
    {
        // this.getAppointment(appointment.getDate())
        //     .then((retrieved)=>
        //     {
        //         if(force)
        //         {
        //             this.appointments.set(appointment.getDate(), appointment);
        //         }
        //         else
        //         {
        //             res.send("Appointment Already Alotted for That Time");
        //         }
        //     })
        //     .catch((message)=>
        //     {
        //         this.appointments.set(appointment.getDate(), appointment);
        //     })

        let aString = appointment.getStartDate().toString();
        console.log("CHECKING APPOINTMENTS AGAIN: "+appointment.parties);
        this.appointments.set(aString, appointment);
        saveAppointmentToDatabase(appointment);
    }

    getAppointments()
    {
        return this.appointments;
    }

    toString()
    {
        let retval = `${this.username}\n${this.email}\n`;
        for (let friend of this.friendUIDS)
        {
            retval += friend + "\n";
        }
        return retval;
    }


    getAppointment(date)
    {
        return new Promise((resolve, reject) =>
        {
            console.log("Getting: " + date);
            let retrieved = this.appointments.get(date);

            if (retrieved === undefined)
            {
                reject("Appointment Not Yet Created");
            }
            else
            {
                resolve(retrieved);
            }
        });
    }

    getAllAppointments()
    {
        return this.appointments.values();
    }
}

class Appointment
{
    constructor(user, place, parties, startDate, endDate, description)
    {
        // console.log(user);
        this.appointmentID = user.getUserName()+startDate.toString();
        this.user = user;
        this.place = place;

        this.startDate = startDate;
        this.endDate = endDate;

        this.parties = [];

        for (let party of parties)
        {
            // console.log("ADDING THIS PARTY" + party);
            this.addParty(user, party);
        }

        this.description = description;
    }

    getID()
    {
        return this.appointmentID;
    }

    makeSerializable()
    {
        // console.log(this.parties);
        let appointment = new Appointment(this.user, this.place, this.parties, this.startDate.toJSON(), this.endDate.toJSON(), this.description);
        // console.log(appointment.parties);
        appointment.user = this.user.getUserName();
        return appointment;

        // console.log(this.parties);
        // let appointment = new Appointment(this.user.getUserName(), this.place, this.parties, this.startDate.toJSON(), this.endDate.toJSON(), this.description);
        // console.log(appointment.parties);
        // appointment.user = this.user.getUserName();
        // return appointment;
    }

    getStartDate()
    {
        return this.startDate;
    }

    getEndDate()
    {
        return this.endDate;
    }

    setStartDate(date)
    {
        this.startDate = date;
    }

    setEndDate(date)
    {
        this.endDate = date;
    }

    addParty(user, friendID)
    {
        if (user.isFriend(friendID))
        {
            this.parties.push(friendID);
        }
    }

    getPlace()
    {
        return this.place;
    }

    setPlace(value)
    {
        this.place = value;
    }

    getParties()
    {
        return this.parties;
    }

    setParties(value)
    {
        this.parties = value;
    }

    getDate()
    {
        return this.getStartDate();
    }

    setDate(value)
    {
        this.date = value;
    }

    getDescription()
    {
        return this.description;
    }

    setDescription(value)
    {
        this.description = value;
    }

    getMonth()
    {
        return this.startDate.getUTCMonth();
    }

    getYear()
    {
        return this.startDate.getUTCFullYear();
    }

    getHour()
    {
        return this.startDate.getHour();
    }

    toString()
    {
        return this.startDate.toString() + "=>" + this.endDate.toString();
    }

}

function appointmentsOverlap(start1, end1, start2, end2)
{
    let s1 = start1.getTime();
    let e1 = end1.getTime();
    let s2 = start2.getTime();
    let e2 = end2.getTime();

    if (s1 < e2 || s2 < e1)
        return true;
    else
        return false;
}

router.route('/users/:username/appointments/:month')
    .get((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((user) =>
            {
                let monthAppointments = [];
                for (let appointment of user.getAllAppointments())
                {
                    if (appointment.getMonth() == (req.params.month - 1))
                        monthAppointments.push(appointment);
                    else
                        console.log("Not IN MONTH");
                }

                res.send(JSON.stringify(monthAppointments));
            })
            .catch((message) =>
            {
                res.send("USER DOES NOT EXIST" + message);
            });
    });

function getThisMonths(user)
{
    return new Promise((resolve, reject) =>
    {
        let today = new Date();
        console.log("Today's month is: " + today.getUTCMonth());

        let thisMonths = [];

        for (let appointment of user.getAllAppointments())
        {
            if (appointment.getMonth() == (today.getUTCMonth()))
                thisMonths.push(appointment);
            else
                console.log("Not IN MONTH");
        }

        if (thisMonths.empty())
        {
            reject("No Appointments this Month");
        }
        else
        {
            resolve(thisMonths);
        }
    });
}

router.route('/users/:username/this_month/')
    .get((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((user) =>
            {
                getThisMonths(user)
                    .then((appointments) =>
                    {
                        res.send(JSON.stringify(appointments));
                    })
                    .catch((error) =>
                    {
                        res.send("" + error)
                    });
            })
            .catch((message) =>
            {
                res.send("USER DOES NOT EXIST" + message);
            });
    });

router.route('/users/:username/appointments/')
    .get((req, res) =>
    {
        // res.sendFile('/dist/html/appointments.html', {root:'.'}, ()=>{console.log("Want to Add a New Appointment");});
        // Commenting out this part so that server may provide HTML content
        getUserFromMap(req.params.username)
            .then((user) =>
            {
                let apps = [];
                for (let appointment of user.getAllAppointments())
                {
                    apps.push(appointment);
                }

                res.send(JSON.stringify(apps));
            })
            .catch((message) =>
            {
                res.send("USER DOES NOT EXIST" + message);
            });
    })
    .post((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((user) =>
            {
                let sDate = new Date(req.body.startDate);
                let eDate = new Date(req.body.endDate);
                user.getAppointment(sDate.toString())
                    .then((appointment) =>
                    {
                        let newAppointment = new Appointment(user, req.body.place, req.body.parties, sDate, eDate, req.body.description);
                        // user.addAppointment(newAppointment);

                        //Check whether appointments span same hours.
                        if (appointmentsOverlap(sDate, eDate, appointment.getStartDate(), appointment.getEndDate()))
                            res.send("Cannot Create Appointment. Time Slot Already Taken.");
                        else
                            user.addAppointment(newAppointment);
                    })
                    .catch((error) =>
                    {
                        let newAppointment = new Appointment(user, req.body.place, ["monica", "eric"], sDate, eDate, req.body.description);
                        console.log(JSON.stringify(newAppointment));
                        user.addAppointment(newAppointment);
                        res.send(error + "\nCreating New Appointment.");
                    });
            })
            .catch((message) =>
            {
                res.send("USER DOES NOT EXIST" + message);
            });
    })
    .put((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((user) =>
            {
                let sDate = new Date(req.body.startDate);
                let eDate = new Date(req.body.endDate);
                user.getAppointment(sDate.toString())
                    .then((appointment) =>
                    {
                        let newAppointment = new Appointment(user, req.body.place, req.body.parties, sDate, eDate, req.body.description);
                        user.addAppointment(newAppointment);
                        res.send("Changes to Appointment Successfully Saved.");
                    })
                    .catch((error) =>
                    {
                        res.send("Appointment Does Not Exist. You May POST a New Appointment if You Wish.");
                    });
            })
            .catch((message) =>
            {
                res.send("USER DOES NOT EXIST" + message);
            });
    })
    .delete((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((user) =>
            {
                let sDate = new Date(req.body.startDate);
                user.getAppointment(sDate.toString())
                    .then((appointment) =>
                    {
                        user.removeAppointment();
                        res.send("Appointment Successfully Removed.");
                    })
                    .catch((error) =>
                    {
                        res.send("Cannot Remove Unexistent Appointment.");
                    });
            })
            .catch((message) =>
            {
                res.send("USER DOES NOT EXIST" + message);
            });
    });

router.route('/users/')
    .get((req, res) =>
    {
        // res.sendFile('dist/html/login.html', {root:'.'}, ()=>{console.log("Want Users");});
        let retval = [];
        for (let userObject of users.values())
        {
            retval.push(userObject.makeSerializable());
        }

        res.send(JSON.stringify(retval));
    })
    .post((req, res) =>
    {
        getUserFromMap(req.body.username)
            .then((retrieved) =>
            {
                res.send(retrieved.getUserName() + " already exists. Please choose a different username.");
            })
            .catch((error) =>
            {
                let newUser = new User(req.body.name, req.body.lastName, req.body.username, req.body.email);
                users.set(req.body.username.toLowerCase(), newUser);
                saveUserToDatabase(newUser.makeSerializable());
                res.send("Created new user successfully: " + newUser.toString());
            });
        // let newUser = new User(req.body.name, req.body.lastName, req.body.username, req.body.email);
        // users.set(req.body.username.toLowerCase(), newUser);
        // saveUserToDatabase(newUser);
        // res.send("Created new user successfully: " + newUser.toString());
    });

//=========================== Routing Simple Get and Delete ======================================
router.route('/users/:username/')
    .get((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((retrieved) =>
            {
                res.send(JSON.stringify(retrieved.makeSerializable()));
            })
            .catch((error) =>
            {
                res.send(error);
            })
    })
    .delete((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((retrieved) =>
            {
                users.delete(retrieved.getUserName().toLowerCase());
                res.send(`Successfully deleted ${retrieved.getUserName()}`);
                deleteUserFromDatabase(retrieved);
            })
            .catch((error) =>
            {
                res.send(error);
            });
    });

//============================== End of Simple Routing and Deleting ==============================

//============================== Routing with username and Email ===================================
router.route('/users/:username/email')
    .put((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((retrieved) =>
            {
                retrieved.setEmail(req.body.email);
                res.send("Successfully changed user's email\n" + retrieved.toString() + "\n");
                saveUserToDatabase(retrieved);
            })
            .catch((error) =>
            {
                res.send(error);
            });
    });
//================================================================================================

router.route('/')
    .get((req, res) =>
    {
        res.sendFile('/dist/html/home.html', {root: '.'}, () =>
        {
            console.log("Home Page loaded successfully!");
        });
    });


//Routing with username, and friendID===============================================================
router.route('/users/:username/friends/:friendID')
    .get((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((retrieved) =>
            {
                if (retrieved.isFriend(req.params.friendID))
                {
                    getUserFromMap(req.params.friendID)
                        .then((friend) =>
                        {
                            res.send(JSON.stringify(friend.makeSerializable()));
                        })
                        .catch((error) =>
                        {
                            res.send("User has no friend with username " + req.params.friendID);
                        });
                }
                else
                {
                    res.send(req.params.friendID + " is not a friend of " + retrieved.getUserName());
                }
            })
            .catch((error) =>
            {
                res.send("There was an error " + error);
            });
    })
    .put((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((retrieved) =>
            {
                getUserFromMap(req.params.friendID)
                    .then((friend) =>
                    {
                        retrieved.addFriendID(req.params.friendID);
                        saveUserToDatabase(retrieved);
                        res.send("Added " + friend.getUserName() + " to " + retrieved.getUserName() + "'s friends list");
                    })
                    .catch((error) =>
                    {
                        res.send("Friend was not found in users list. " + error);
                    })
            })
            .catch((error) =>
            {
                res.send(error);
            });
    })
    .delete((req, res) =>
    {
        getUserFromMap(req.params.username)
            .then((retrieved) =>
            {
                getUserFromMap(req.params.friendID)
                    .then((friend) =>
                    {
                        //need to verify if still in friend's list to prevent unnecessary delete calls
                        retrieved.removeFriendID(req.params.friendID);
                        res.send("Removed " + friend.getUserName() + " from " + retrieved.getUserName() + "'s friends list");
                        saveUserToDatabase(retrieved);
                    })
                    .catch((error) =>
                    {
                        res.send("Friend was not found in users list. " + error);
                    })
            })
            .catch((error) =>
            {
                res.send(error);
            });
    });

//================================================================================================


function getUserFromMap(username)
{
    return new Promise((resolve, reject) =>
    {
        let retrieved = users.get(username.toLowerCase());

        if (retrieved === undefined)
        {
            reject("User Not Found");
        }
        else
        {
            resolve(retrieved);
        }
    });
}

function downloadAppointments()
{
    return new Promise((resolve, reject)=>
    {
        let freindsRef = database.ref('appointments');

        freindsRef.once('value')
            .then((snapshot) =>
            {
                let apps = snapshot.val();
                // console.log(appointments);

                for(let count in apps)
                {
                    // console.log("AN APPOINTMENT ==================");
                    // console.log(appointments[count].appointmentID);
                    // console.log("END APPOINTMENT==================");

                    let appointment = apps[count];
                    let newUser = users.get(appointment.user);
                    console.log(newUser.getUserName());
                    let newAppt = new Appointment(newUser, appointment.place, appointment.parties, new Date(appointment.startDate), new Date(appointment.endDate), appointment.description);
                    appointments.push(newAppt);
                    console.log(newAppt.appointmentID);
                }

                console.log()

                if(appointments.length===0)
                    reject("Array was not filled")
                else
                    resolve();
            });
    })
}

function downloadFriends(user)
{
    let freindsRef = database.ref('friends').child(user.getUserName());

    freindsRef.once('value')
        .then((snapshot) =>
        {
            let friends = snapshot.val();

            if (friends !== null)
            {
                // console.log("These are the friends I downloaded: " + friends);
                for (let i in friends)
                {
                    // console.log("Friend: " + friends[i]);
                    user.addFriendID(friends[i]);
                }
            }
        });
}


function downloadDataFromFireBase()
{
    let reference = database.ref('users/');
    reference.once('value')
        .then((snapshot) =>
        {
            let data = snapshot.val();
            //console.log(data);
            users = new Map();

            let user;
            for (let element in data)
            {
                user = data[element];
                let newUser = new User(user.name, user.lastName, user.username, user.email);
                downloadFriends(newUser);

                for(let app of appointments)
                {
                    if(app.user===newUser.getUserName())
                        console.log(app);
                }
                //console.log(user);
                users.set(user.username, newUser);
            }

            downloadAppointments()
                .then(()=>
                {
                    for(let u of users.values())
                    {
                        addAppointmentsTo(u);
                    }
                })
                .catch((error)=>{console.log(error)})
        })
        .catch((error) =>
        {
            console.log(error);
        });
}

function addAppointmentsTo(user)
{
    console.log("Got these: "+appointments);
    console.log(user);

    for(let a of appointments)
    {
        user.addAppointment(a);
    }
}

function getGoing()
{
    if (loadFromFireBase)
    {
        downloadDataFromFireBase();
    }
    else
    {
        users = new Map();
        let newUser = new User("ssbb231", "jdboddenp@gmail.com");
        let friend = new User("jlopez", "jlopez@cs.gmu.edu");
        newUser.addFriendID("jlopez");
        users.set("ssbb231", newUser);
        users.set(friend.username.toLowerCase(), friend);
    }

    app.use(jsonParser);
    app.use('/', router);
    app.use(express.static('client/build'));
    app.listen(port);
}

function saveUserToDatabase(data)
{
    database.ref('users/' + data.getUserName()).set(data);
    //this part isn't working. Set is somehow not put into the tree.
    addFriendListToDatabase(data.makeSerializable());
}

function addFriendListToDatabase(data)
{
    let node = database.ref().child('friends').child(data.getUserName());
    node.remove();

    for (let friend of data.getFriendUIDS())
    {
        console.log("RETRIEVED THIS INFO: " + friend);
        database.ref().child('friends').child(data.getUserName()).push(friend);
    }

    console.log("Added all friends==================");
}

function saveAppointmentToDatabase(appointment)
{
    let serialAp = appointment.makeSerializable();

    database.ref('appointments/'+appointment.getID()).set(serialAp);
    // //Remove previous parties if there were any
    // database.ref('parties/'+appointment.getID()).remove();
    //
    // //Iterate through parties and push them into the tree
    // let newNode = database.ref('parties/'+appointment.getID());
    // console.log("============= Parties =====================");
    // console.log(serialAp.getParties());
    // console.log("============= Parties =====================");
    //
    // for(let party of serialAp.getParties())
    // {
    //     console.log("ADDING " + party + " TO THE DATABASE");
    //     newNode.push(party);
    // }
}

function deleteUserFromDatabase(user)
{
    database.ref('users/').child(user.getUserName()).remove();
}

getGoing();

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.route('*')
    .get((req, res) =>
    {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });

console.log(`Password generator listening on ${port}`);
