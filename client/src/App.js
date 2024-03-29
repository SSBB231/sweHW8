import React, {Component} from 'react';
// import logo from './logo.svg';
// import './bootstrap.css';
// import './starter-template.css';

class App extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {view: "home", user: null};
    }

    componentDidMount()
    {
        // //fetch celine from the user database
        // fetch('users/cdione')
        //     .then((response) =>
        //     {
        //         return response.json();
        //     })
        //     .then((retrievedUser) =>
        //     {
        //         // alert(retrievedUser.username);
        //         this.setState({user: retrievedUser});
        //     })
        //     .catch((error) =>
        //     {
        //         console.log(error);
        //     });

        let noUser = {
            "username":"NOUSER",
            "name":"NOUSER",
            "lastName":"NOUSER",
            "email":"NOUSER",
            "friendUIDS":[],
            "appointments":[],
            "password":"NOUSER"
        };

        this.setState({user: noUser});
    }

    login()
    {
        /*Ben's Login Logic Here*/
        //Should fetch user from backend and put it in variable named fetched
        //should call this.setState({user: fetchedUser});
    }

    changeToUsersScreen()
    {
        // alert("Changing to All Users Screen");
        this.setState({view: "users"});
    }

    changeToProfile()
    {
        // alert("Changing to All Users Screen");
        this.setState({view: "profile"});
    }

    changeToHomeScreen()
    {
        // alert("Changing to Home Screen");
        this.setState({view: "home"});
    }

    changeToLogin()
    {
        this.setState({view: "login"});
    }

    changeToAllAppointments()
    {
        this.setState({view: "allappointments"});
    }

    changeToPostAppointment()
    {
        this.setState({view: "postappointment"});
    }

    render()
    {
        if (this.state.view === "home")
        {
            //alert('Fetching');
            // console.log("RENDERING SOMETHING");
            return (
                <div className="App">
                    {/*<header className="App-header">*/}
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<h1 className="App-title">Failed to Load Homepage</h1>*/}
                    {/*</header>*/}
                    {/*<p className="App-intro">*/}
                    {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                    {/*</p>*/}
                    <NavBar     toHome={() => this.changeToHomeScreen()}
                                toUsers={() => this.changeToUsersScreen()}
                                toLogin={() => this.changeToLogin()}
                                toAllAppointments={() => this.changeToAllAppointments()}
                                toProfile={() => this.changeToProfile()}
                                toAddApp={() => this.changeToPostAppointment()}/>
                    <HomeScreen/>
                </div>
            );
        }
        else if (this.state.view === "users")
        {
            return (
                <div className="App">
                    <NavBar     toHome={() => this.changeToHomeScreen()}
                                toUsers={() => this.changeToUsersScreen()}
                                toLogin={() => this.changeToLogin()}
                                toAllAppointments={() => this.changeToAllAppointments()}
                                toProfile={() => this.changeToProfile()}
                                toAddApp={() => this.changeToPostAppointment()}/>
                    <h1 className={"text-center"}>These Are All the App's Registered Users</h1>
                    <AllUsers/>
                    <br/>
                </div>
            );
        }
        else if (this.state.view === "login")
        {
            return (
				<div>
                    <NavBar     toHome={() => this.changeToHomeScreen()}
                                toUsers={() => this.changeToUsersScreen()}
                                toLogin={() => this.changeToLogin()}
                                toAllAppointments={() => this.changeToAllAppointments()}
                                toProfile={() => this.changeToProfile()}
                                toAddApp={() => this.changeToPostAppointment()}/>
                <Login updateUser={(user)=>this.updateUser(user)} toHome={() => this.changeToHomeScreen()}/>
				</div>
            )
        }
        else if (this.state.view === "allappointments")
        {
            return (
                <div>
                    <NavBar     toHome={() => this.changeToHomeScreen()}
                                toUsers={() => this.changeToUsersScreen()}
                                toLogin={() => this.changeToLogin()}
                                toAllAppointments={() => this.changeToAllAppointments()}
                                toProfile={() => this.changeToProfile()}
                                toAddApp={() => this.changeToPostAppointment()}/>
                    <AllAppointmentsFor user={this.state.user}/>
                    <br/>
                </div>
            );
        }
        else if (this.state.view === "profile")
        {
            return (
                <div>
                    <NavBar     toHome={() => this.changeToHomeScreen()}
                                toUsers={() => this.changeToUsersScreen()}
                                toLogin={() => this.changeToLogin()}
                                toAllAppointments={() => this.changeToAllAppointments()}
                                toProfile={() => this.changeToProfile()}
                                toAddApp={() => this.changeToPostAppointment()}/>
                    <Profile user={this.state.user}/>
                    <br/>
                </div>
            );
        }
        else if (this.state.view === "postappointment")
        {
            // alert("Changing")
            return (
                <div>
					<NavBar     toHome={() => this.changeToHomeScreen()}
                                toUsers={() => this.changeToUsersScreen()}
                                toLogin={() => this.changeToLogin()}
                                toAllAppointments={() => this.changeToAllAppointments()}
                                toProfile={() => this.changeToProfile()}
                                toAddApp={() => this.changeToPostAppointment()}/>
                    <PostAppointment user={this.state.user} goHome={()=>this.changeToHomeScreen()}/>
                    <br/>
                </div>
            );
        }

    }

    updateUser(newUser)
    {
        this.setState({user: newUser});
        this.changeToProfile();
    }
}

class NavBar extends Component
{
	constructor(props)
    {
        super(props);
		this.state = {currentView: this.props.viewID};
    }

	render()
	{
		return (
		<nav className="navbar navbar-toggleable-md navbar-inverse bg-info fixed-top">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <button className="btn btn-warning" href="#" onClick={this.props.toHome}>Appointinator</button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            {/*<li className="nav-item active">*/}
                                {/*<a className="nav-link" href="#" onClick={this.props.toHome}>Home<span className="sr-only">(current)</span></a>*/}
                            {/*</li>*/}
                            <li className="nav-item active">
                                <a className="nav-link " href="#" onClick={this.props.toUsers}>Users<span
                                    className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#" onClick={this.props.toLogin}>Log In</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#" onClick={this.props.toAllAppointments}>Appointments</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#" onClick={this.props.toProfile}>Profile</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#" onClick={this.props.toAddApp}>Add Appointment</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search by Month"/>
                            <button className="btn btn-warning my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
			);
	}
}

class Profile extends Component
{
    constructor(props)
    {
        super(props);
        this.user = props.user;
    }

    render()
    {
        if(this.user.username === "NOUSER")
        {
            return (<h3 className={"text-center"}>Please Login to View your Profile</h3>);
        }
        else
        {
            return (

                <div className="container">
                    <div className="header clearfix">
                        <h1 id="username">{this.user.username}</h1>
                        {/*<h3 className="text-muted">Profile</h3>*/}
                    </div>

                    <div className="jumbotron-fluid">

                        <div className="row align-self-auto">
                            <div className="col-lg-4">
                                <h4>Name</h4>
                                <p id="name">{this.user.name}</p>

                                <h4>Email</h4>
                                <p id="email">{this.user.email}</p>
                            </div>
                            <div className="col-lg-6">
                                <h4>Last Name</h4>
                                <p id="lastName">{this.user.lastName}</p>
                            </div>

                        </div>

                        <br/>
                        <h4>Friends</h4>
                        <div>
                            <table ref="friends" className={"table table-striped table-hover"}>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                                <tr>
                                    <td>someName</td>
                                    <td>someEmail</td>
                                </tr>
                            </table>
                        </div>

                    </div>


                    <footer className="footer">
                        <p>&copy; Appointinator 2017</p>
                    </footer>
                </div>
            )
        }
    }
}

//Class To Display ALl Appointments for Given User
class AllAppointmentsFor extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {fetched: false, appointments: null};
    }

    componentDidMount()
    {
        this.pullAppointmentsFromServer();
    }

    pullAppointmentsFromServer()
    {
        // alert("Fetching Stuff");
        //fetch appointments for the current user
        console.log("THIS IS THE USERNAME I'M SEARCHING: "+this.props.user.username);

        if(this.props.user.username === "NOUSER")
            return;

        fetch('users/' + this.props.user.username + '/appointments')
            .then((response) =>
            {
                return response.json();
            })
            .then((retrievedAppointments) =>
            {
                console.log("RETRIEVED APPOINTMENTS");
                console.log(retrievedAppointments);

                this.setState({fetched: true, appointments: retrievedAppointments});
            })
            .catch((error) =>
            {
                alert(error);
            });
    }

    render()
    {
        if(this.props.user.username === "NOUSER")
        {
            return (<h3 className={"text-center"}>Please Login to View your Appointments</h3>);
        }
        else
        {
            if (this.state.fetched === true)
            {
                let rows = [];
                let appointments = this.state.appointments;

                console.log("THIS I WILL USE");
                console.log(appointments);
                console.log(appointments[0]);

                let index = 0;
                let n = appointments.length;

                rows.push(
                    <div className={"row"}>
                        <th className={"col-sm-2"}>
                            Starts
                        </th>
                        <th className={"col-sm-2"}>
                            Ends
                        </th>
                        <th className={"col-sm-3"}>
                            Description
                        </th>
                        <th className={"col-sm-3"}>
                            Attendees
                        </th>
                    </div>);

                for (let i = index; i < n; i++)
                {
                    let row = [];

                    if (i == 0)
                    {

                    }

                    // for (let element in appointments[i])
                    // {
                    //     if(appointments[i][element] === null)
                    //         console.log("NULL");
                    //     else
                    //         row.push(<div>{appointments[i][element].toString()}</div>);
                    // }

                    let startDate = new Date(appointments[i].startDate);
                    let sDate = startDate.toLocaleDateString();
                    let sTime = startDate.toLocaleTimeString();

                    let endDate = new Date(appointments[i].endDate);
                    let eDate = endDate.toLocaleDateString();
                    let eTime = endDate.toLocaleTimeString();

                    let parties = "";

                    for (let j in appointments[i].parties)
                    {
                        if (j == 0)
                            parties += appointments[i].parties[j];
                        else
                            parties += ", " + appointments[i].parties[j];
                    }


                    row.push(
                        <div className={"row"}>
                            <td className={"col-sm-2"}>
                                {sDate + "\n" + sTime}
                            </td>
                            <td className={"col-sm-2"}>
                                {eDate + "\n" + eTime}
                            </td>
                            <td className={"col-sm-3"}>
                                {appointments[i].description.trim()}
                            </td>
                            <td className={"col-sm-3"}>
                                {parties}
                            </td>
                        </div>);

                    rows.push(<tr>{row}</tr>);
                }
                //this all just makes an example table based on n inputs

                console.log("ARRAY");
                console.log(this.state.appointments);
                // rows = ["test entry"];
                //     let i =0;    //counter to track inside for of loop
                // for(let app of this.state.appointments)
                // {
                //         i++;
                //     console.log("app in this.state.appointments: "+app);
                //     rows.push(<tr key={i} ><td>{app}</td></tr>)

                // }
                return (
                    <div className={"my_table"}>
                        <h1 className={"text-center"}>Appointments Table</h1>
                        <table id="simple-board" className="table table-striped">
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </div>

                );
            }
            else
            {
                return (
                    <div>
                        <h3 className={"text-center"}>Please wait one moment while we load your appointments</h3>
                    </div>
                )
            }
        }
    }
}


//Component to Render All Appointments for User in Given Month
class AppointmentsForMonth extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {fetched: false};
    }

    //all same code as from AllAppointmentsFor with just the month being right in the for of in render
    // componentDidMount()
    // {
    //     //fetch appointments for the current user
    //     fetch('users/' + this.props.user.username + '/appointments')
    //         .then((response) =>
    //         {
    //             return response.json();
    //         })
    //         .then((retrievedAppointments) =>
    //         {
    //             console.log(retrievedAppointments);
    //
    //             this.setState({fetched: true, appointments: retrievedAppointments});
    //         })
    //         .catch((error) =>
    //         {
    //             alert(error);
    //         });
    //
    //     this.setState({fetched: true});
    // }

    render()
    {
        if (this.state.fetched)
        {
            let rows = [];

            let index = 1;
            let n = 4;
            for (let i = index; i <= n; i++)
                rows.push(<tr padding-bottom="1em" key={i}>
                    <td>{"test entry #" + i}</td>
                </tr>)
            //this all just makes an example table based on n inputs

            console.log("ARRAY");
            console.log(this.state.appointments);
            // rows = ["test entry"];
            //     let i =0;        //counter to track inside for of loop
            // for(let app of this.state.appointments)
            // {
            //         if(app.month==*testmonth*)          ***************THIS CHECKING FOR CORRECT MONTH
            //         {
            //          i++;
            //     console.log("app in this.state.appointments: "+app);
            //     rows.push(<tr key={i} ><td>{app}</td></tr>)
            //          }

            // }
            return (
                <div>
                    <h1>Appointments Table</h1>
                    <table id="simple-board" className="table table-hover table-striped">
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <h1>Content Was Not Fetched from Server. Please Refresh the Page.</h1>
                </div>
            )
        }
    }
}

class PostAppointment extends Component
{
    constructor(props)
    {
        super(props);
        this.user = props.user;
        this.friends = [];
    }

    grabAppointmentFromForm()
    {
        let ap = this.createAppointment();
        ap.parties = this.parseParties();
        this.sendAppointment(ap);
        alert("The appointment has been added to your calendar");
        this.props.goHome();
        //I tried to get it to reroute back to the home after adding but I couldn't get it to work properly
    }

    addFriendToPartiesField(friend)
    {
        if(this.refs.partiesField.value.includes(friend))
        {
            if(this.refs.partiesField.value.includes(friend+", "))
            {
                this.refs.partiesField.value = this.refs.partiesField.value.replace(friend+", ", "");
            }
            else if(this.refs.partiesField.value.includes(", "+friend))
            {
                this.refs.partiesField.value = this.refs.partiesField.value.replace(", "+friend, "");
            }
            else if(this.refs.partiesField.value.includes(friend))
            {
                this.refs.partiesField.value = this.refs.partiesField.value.replace(friend, "");
            }

            return;
        }

        if(this.refs.partiesField.value === "")
        {
            this.refs.partiesField.value = friend;
        }
        else
        {
            this.refs.partiesField.value = this.refs.partiesField.value + ", " + friend;
        }
    }

    sendAppointment(ap)
    {
        //	Send	data	to	remote	service
        fetch("users/" + this.user.username + "/appointments",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(ap)
            })
            .then(function (res)
            {
                console.log(res)
            })
            .catch(function (res)
            {
                alert(res);
            });
    }

    createAppointment()
    {
        let appointment =
            {
                "user": this.user,
                "place": this.refs.placeField.value,
                "parties": [],
                "startDate": this.refs.sDate.value,
                "endDate": this.refs.eDate.value,
                "description": this.refs.des.value
            };

        return appointment;

    }

    parseParties()
    {
        let pString = this.refs.partiesField.value;
        pString = pString.trim().replace(/ /g, "");
        if(pString.includes(","))
        {
            return pString.split(',');
        }
        else
        {
            return [pString];
        }
    }

    render()
    {
        return (
            <div className={"myMarginator"}>
                <h2 className="form-signin-heading">Add a New Appointment</h2>
                <strong>
                    <p>
                        Please enter the following data to create an appointment.
                    </p>
                </strong>
                <table className={"myTable"}>
                    <tr>
                        <td width={700}>
                            <form className="form-group" onSubmit={() => this.grabAppointmentFromForm()}>
                                <ul  className="list-group">
                                    <li>
                                        <label for="inputParties">Parties</label>
                                        <input ref="partiesField" type="text" id="inputParties" className="form-control"
                                               placeholder="Click on Friends on Table" required/>
                                        <br/>
                                    </li>
                                    <li>
                                        <label for="inputPlace">Place</label>
                                        <input ref="placeField" type="text" id="inputPlace" className="form-control" placeholder="Place"
                                               required autofocus/>
                                        <br/>
                                    </li>
                                    <li>
                                        <label for="inputStartDate">Start Date</label>
                                        <input ref="sDate" type="datetime-local" id="inputStartDate" className="form-control" required/>
                                        <br/>
                                    </li>
                                    <li>
                                        <label for="inputEndDate">End Date</label>
                                        <input ref="eDate" type="datetime-local" id="inputEndDate" className="form-control" required/>
                                        <br/>
                                    </li>
                                    <li>
                                        <label for="inputDescription">Description</label>
                                        <input ref="des" type="text" id="inputDescription" className="form-control"
                                               placeholder="Birthday" required/>
                                        <br/>
                                    </li>
                                </ul>

                                <br/>
                                <button className={"btn btn-lg btn-warning btn-block"}
                                        type="submit">Add Appointment
                                </button>
                            </form>
                        </td>
                        <td className={"myCol"}>
                            <AllFriends user={this.user} rowHandle={(friend)=>{this.addFriendToPartiesField(friend)}}/>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

//Class to Dsiplay Login Prompt
class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {fetched: false};
    }

    logIn()
    {
        this.pullInfoFromLogin()
            .then((loginInfo)=>
            {
                fetch("users/" + loginInfo.email.substring(0, loginInfo.email.indexOf("@")) + "/",
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify(loginInfo)
                    })
                    .then(function (res)
                    {
                        return res.json();
                    })
                    .then((user)=>
                    {
                        alert("LOGGED IN AS: " + user.username);
                        this.props.updateUser(user);
                    })
                    .catch(function (res)
                    {
                        alert(res);
                    });
            })
            .catch((error)=>alert(error));
    }

    pullInfoFromLogin()
    {
        return new Promise((resolve, reject)=>
        {
            let loginInfo = {};

            loginInfo.email = this.refs.emailInput.value;
            loginInfo.password = this.refs.passwordInput.value;

            // alert(`FETCHED VALS:\nemail: ${loginInfo.email}\npassword: ${loginInfo.password}`);

            if(loginInfo.email !== null && loginInfo.password !== null)
            {
                resolve(loginInfo);
            }
            else
            {
                reject("FAILED TO GRAB STUFF FOR LOGIN");
            }
        });
    }

    componentDidMount()
    {

        this.setState({fetched: true});
    }

    render()
    {
        return (
            <div>
                <div className="container">
                    <main role="main">
                        {/*<section className="signup">*/}
                            {/*/!*<div className="jumbotron-fluid">*!/*/}
                                {/*/!*<h1 className="display-3">Sign Up</h1>*!/*/}
                                {/*/!*<p className="lead">Wanna manage your appointments like a pro? Sign up today to gain full*!/*/}
                                    {/*/!*access to our appointment manager service!</p>*!/*/}
                                {/*/!*<p><a className="btn btn-lg btn-primary" href="#" role="button">Sign Up</a></p>*!/*/}
                            {/*/!*</div>*!/*/}
                        {/*</section>*/}

                        {/*<hr/>*/}
                        {/*<br/>*/}
                        <section className="login">
                            {/*<div>*/}
                                {/*<h2 className="alert-light" align="center">Already have an account?</h2>*/}
                            {/*</div>*/}

                            <div className="container">
                                <form className="form-signin" onSubmit={()=>this.logIn()}>
                                    <h2 className="form-signin-heading">Please sign in</h2>
                                    <br/>

                                    <label for="inputEmail" className="sr-only">Email address</label>
                                    <input ref={"emailInput"} type="email" id="inputEmail" className="form-control"
                                           placeholder="Email address" required autofocus/>
                                    <br/>
                                    <label for="inputPassword" className="sr-only">Password</label>
                                    <input ref={"passwordInput"} type="password" id="inputPassword" className="form-control"
                                           placeholder="Password" required/>
                                    {/*<div className="checkbox">*/}
                                        {/*<label>*/}
                                            {/*<input type="checkbox" value="remember-me"/> Remember me*/}
                                        {/*</label>*/}
                                    {/*</div>*/}
                                    <br/>
                                    <br/>
                                    <button className="btn btn-lg btn-outline-warning btn-block" type="submit">Sign In</button>
                                </form>
                            </div>
                        </section>
                    </main>

                    <br/>
                    <footer className="footer">
                        <p>&copy; Appointinator 2017</p>
                    </footer>

                </div>
            </div>
        )
    }
}

class CelinesAppointments extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {size: 2};
        this.userarray = [];
        //let firstnames userarray.map((firstname
        this.firstnames = [1, 2, 3];
        this.lastnames = [1, 2, 3];
        this.arrayemails = [3, 2, 1];
    }

    componentDidMount()
    {

        fetch('/users/cdione/appointments/')
            .then(response =>
            {
                return response.json();
            })
            .then((json) =>
            {
                this.userarray = json;
                console.log("FETCHED APPOINTMENTS");
                console.log(this.userarray);
                this.firstnames = this.userarray.map((user) => user.name);
                this.lastnames = this.userarray.map((user) => user.lastName);

                this.arrayemails = this.userarray.map((user) => user.email);
                this.setState({fetched: "true"});
            })
            .catch(error =>
            {
                console.log(error);
            });

    }

    render()
    {
        let rows = [];
        let count = 0;
        for (var i = 0; i < this.userarray.length / 2; i++)
        {
            let rowID = `row${i}`
            let cell = []

            for (var idx = 0; idx < 2; idx++)
            {
                let cellID = `cell${i}-${idx}`
                if (count % 2 == 0)
                    cell.push(<td key={cellID} id={cellID}>{this.firstnames[count] + " " + this.lastnames[count]}</td>)
                else
                    cell.push(<td key={cellID} id={cellID}>{this.arrayemails[count - 1]}</td>)

                count++;
                console.log(this.firstnames);
            }
            rows.push(<tr key={i} id={rowID}>{cell}</tr>)
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 board">
                        <table id="simple-board" className="table table-hover table-striped">
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )

    }
}

class AllFriends extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {fetched: false, friends: null};
    }

    componentDidMount()
    {
        //fetch appointments for the current user
        fetch('/users/' + this.props.user.username + '/friends')
            .then((response) =>
            {
                return response.json();
            })
            .then((retrievedFriends) =>
            {
                console.log(retrievedFriends);

                this.setState({fetched: true, friends: retrievedFriends});
            })
            .catch((error) =>
            {
                alert(error);
            });
    }

    render()
    {
        if (this.state.fetched === true)
        {
            let rows = [];
            let friends = this.state.friends;

            console.log("THIS I WILL USE");
            console.log(friends);
            console.log(friends[0]);

            let index = 0;
            let n = 3;
            for (let i = index; i < n; i++)
            {
                let row = [];
                row.push(<div>{friends[i]}</div>);
                rows.push(
                    <tr  key={i} onClick={()=>this.props.rowHandle(friends[i])}>
                        <td className={"text-center"}>{row}</td>
                    </tr>);
            }
            //this all just makes an example table based on n inputs

            console.log("ARRAY");
            console.log(this.state.friends);
            // rows = ["test entry"];
            //     let i =0;    //counter to track inside for of loop
            // for(let app of this.state.friends)
            // {
            //         i++;
            //     console.log("app in this.state.friends: "+app);
            //     rows.push(<tr key={i} ><td>{app}</td></tr>)

            // }
            return (
                <div className={"container"}>
                    <h3>Friends</h3>
                    <table id="simple-board" ref={"firendsTable"} className="friendsTable table-hover table-striped">
                        <col width={200}/>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>

            );
        }
        else
        {
            return (
                <div>
                    <h3 className={"text-center"}>Please wait one moment while we load your friends</h3>
                </div>
            )
        }
    }
}

class AllUsers extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {size: 2, fetched: false}
        this.userarray = [];
        //let firstnames userarray.map((firstname
        this.firstnames = [1, 2, 3];
        this.lastnames = [1, 2, 3];
        this.arrayemails = [3, 2, 1];
    }

    componentDidMount()
    {

        if(this.state.fetched !== true)
        {
            fetch('/users/')
                .then(response =>
                {
                    return response.json();
                })
                .then((json) =>
                {
                    this.userarray = json;
                    console.log(this.userarray);
                    this.firstnames = this.userarray.map((user) => user.name);
                    this.lastnames = this.userarray.map((user) => user.lastName);

                    this.arrayemails = this.userarray.map((user) => user.email);

                    // console.log(this.firstnames);
                    // console.log(this.lastnames);
                    // console.log(this.arrayemails);


                    this.setState({fetched: true});
                })
                .catch(error =>
                {
                    console.log(error);
                });
        }

    }

    render()
    {
        let rows = [];
        let count = 0;
        for (var i = 0; i < this.userarray.length/2; i++)
        {
            let rowID = `row${i}`
            let cell = []

            for (let idx = 0; idx < 2; idx++)
            {
                let cellID = `cell${i}-${idx}`
                if (count % 2 == 0)
                    cell.push(<td key={cellID} id={cellID}>{this.firstnames[count] + " " + this.lastnames[count]}</td>)
                else
                    cell.push(<td key={cellID} id={cellID}>{this.arrayemails[count - 1]}</td>)

                count++;
                console.log("DIS DA NAMES")
                console.log(this.firstnames);
            }
            rows.push(<tr key={i} id={rowID}>{cell}</tr>)
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 board">
                        <table id="simple-board" className="table table-hover table-striped">
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )

    }
}

class HomeScreen extends Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {

    }

    render()
    {
        return (
            <div>
                <div className="container">
                    <div className="starter-template">
                        <h1>Welcome to Appointinator</h1>
                        <p>Any similarity with Doofenshmirtz's naming conventions is mere coincidence.</p>
                        <img src={require('./appointment.png')}/>
                        <br/>
                        <br/>
                    </div>

                    <section id="this_month">
                    </section>

                </div>
            </div>
        );
    }
}

export default App;
