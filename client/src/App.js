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
        //fetch celine from the user database
        fetch('users/cdione')
            .then((response) =>
            {
                return response.json();
            })
            .then((retrievedUser) =>
            {
                // alert(retrievedUser.username);
                this.setState({user: retrievedUser});
            })
            .catch((error) =>
            {
                console.log(error);
            });
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

    render()
    {
        if (this.state.view === "home")
        {
            console.log("RENDERING SOMETHING");
            return (
                <div class="App">
                    {/*<header className="App-header">*/}
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*<h1 className="App-title">Failed to Load Homepage</h1>*/}
                    {/*</header>*/}
                    {/*<p className="App-intro">*/}
                    {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                    {/*</p>*/}
                    <HomeScreen toUsers={() => this.changeToUsersScreen()}
                                toLogin={() => this.changeToLogin()}
                                toAllAppointments={() => this.changeToAllAppointments()}
                                toProfile={() => this.changeToProfile()}/>
                </div>
            );
        }
        else if (this.state.view === "users")
        {
            return (
                <div class="App">
                    <h1>These Are All the App's Registered Users</h1>
                    <AllUsers/>
                    <br/>
                    <button onClick={() => this.changeToHomeScreen()}>Go Back to Homescreen</button>
                </div>
            );
        }
        else if (this.state.view === "login")
        {
            return (
                <Login toHome={() => this.changeToHomeScreen()}/>
            )
        }
        else if (this.state.view === "allappointments")
        {
            return (
                <div>
                    <AllAppointmentsFor user={this.state.user}/>
                    <br/>
                    <button onClick={() => this.changeToHomeScreen()}>Go Back to Homescreen</button>
                </div>
            );
        }
        else if (this.state.view === "profile")
        {
            return (
                <div>
                    <button onClick={() => this.changeToHomeScreen()}>Go Back to Homescreen</button>
                    <Profile user={this.state.user}/>
                    <br/>
                </div>
            );
        }
        else if (this.state.view === "postpointment")
        {
            return (
                <div>
                    <button onClick={() => this.changeToHomeScreen()}>Go Back to Homescreen</button>
                    <PostAppointment user={this.state.user}/>
                    <br/>
                </div>
            );
        }

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
        return (

            <div class="container">
                <div class="header clearfix">
                    <nav>
                        <ul class="nav nav-pills float-right">
                            <li class="nav-item">
                                <a class="nav-link active" href="/html/home.html">Home <span
                                    class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                        </ul>
                    </nav>
                    <h3 class="text-muted">Profile</h3>
                </div>

                <div class="jumbotron-fluid">

                    <h1 id="username" class="display-3">Username</h1>
                    <br/>
                    <div class="row align-self-auto">

                        <div class="col-lg-4">
                            <h4>Name</h4>
                            <p id="name">{this.user.name}</p>

                            <h4>Email</h4>
                            <p id="email">{this.user.email}</p>
                        </div>

                        <div class="col-lg-6">
                            <h4>Last Name</h4>
                            <p id="lastName">{this.user.lastName}</p>
                        </div>

                    </div>

                    <br/>
                    <h4>Friends</h4>
                    <div>
                        <table id="friends" class="table table-hover">
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


                <footer class="footer">
                    <p>&copy; utuezi 2017</p>
                </footer>
            </div>
        )
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
        //fetch appointments for the current user
        fetch('users/' + this.props.user.username + '/appointments')
            .then((response) =>
            {
                return response.json();
            })
            .then((retrievedAppointments) =>
            {
                console.log(retrievedAppointments);
                this.setState({fetched: true, apppointments: retrievedAppointments});
            })
            .catch((error) =>
            {
                alert(error);
            });

        this.setState({fetched: true});
    }

    render()
    {
        if (this.state.fetched)
        {
            let rows = [];

            for(let app of this.state.appointments)
            {

            }

            return (
                <div>
                    <h1>Main Content Here</h1>
                </div>
            )
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

//Component to Render All Appointments for User in Given Month
class AppointmentsForMonth extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {fetched: false};
    }

    componentDidMount()
    {

        this.setState({fetched: true});
    }

    render()
    {
        return (
            <div>

            </div>
        );
    }
}

class PostAppointment extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div class="container">
                <form class="form-group">
                    <h2 class="form-signin-heading">Add a New Appointment</h2>
                    <strong>
                        <p>
                            Please enter the following data to create an appointment.
                        </p>
                    </strong>
                    <ul style="list-style: none;" class="list-group">
                        <li>
                            <label for="inputPlace">Place</label>
                            <input type="text" id="inputPlace" class="form-control" placeholder="Place" required autofocus/>
                                <br/>
                        </li>
                        <li>
                            <label for="inputParties" >Parties</label>
                            <input type="text" id="inputParties" class="form-control" placeholder="user1, user2, user3..." required/>
                                <br/>
                        </li>
                        <li>
                            <label for="inputStartDate" >Start Date</label>
                            <input type="datetime-local" id="inputStartDate" class="form-control" required/>
                                <br/>
                        </li>
                        <li>
                            <label for="inputEndDate" >End Date</label>
                            <input type="datetime-local" id="inputEndDate" class="form-control" required/>
                                <br/>
                        </li>
                        <li>
                            <label for="inputDescription" >End Date</label>
                            <input type="text" id="inputDescription" class="form-control" placeholder="Birthday" required/>
                                <br/>
                        </li>
                    </ul>

                    <div class="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me"> Remember me</input>
                        </label>
                    </div>
                    <br/>
                        <button class="btn btn-lg btn-primary btn-block" type="submit">Add Appointment</button>
                </form>

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

    componentDidMount()
    {

        this.setState({fetched: true});
    }

    render()
    {
        return (
            <div>
                <button onClick={this.props.toHome}>Go Back to Homescreen</button>
                <div class="container">

                    <div class="header clearfix">
                        <nav id="mainNavBar">
                            <ul class="nav nav-pills float-right">
                                <li class="nav-item">
                                    <a class="nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Appointments</a>
                                </li>
                            </ul>
                        </nav>
                        <h3 class="text-muted">utuezi</h3>
                    </div>

                    <main role="main">
                        <section class="signup">
                            <div class="jumbotron-fluid">
                                <h1 class="display-3">Sign Up</h1>
                                <p class="lead">Wanna manage your appointments like a pro? Sign up today to gain full
                                    access to our appointment manager service!</p>
                                <p><a class="btn btn-lg btn-primary" href="#" role="button">Sign Up</a></p>
                            </div>
                        </section>

                        <hr/>
                        <br/>

                        <section class="login">
                            <div>
                                <h2 class="alert-light" align="center">Already have an account?</h2>
                            </div>

                            <div class="container">
                                <form class="form-signin">
                                    <h2 class="form-signin-heading">Please sign in</h2>
                                    <label for="inputEmail" class="sr-only">Email address</label>
                                    <input type="email" id="inputEmail" class="form-control"
                                           placeholder="Email address" required autofocus/>
                                    <label for="inputPassword" class="sr-only">Password</label>
                                    <input type="password" id="inputPassword" class="form-control"
                                           placeholder="Password" required/>
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" value="remember-me"/> Remember me
                                        </label>
                                    </div>
                                    <button class="btn btn-lg btn-outline-success btn-block" type="submit">Sign in
                                    </button>
                                </form>
                            </div>
                        </section>
                    </main>

                    <br/>
                    <footer class="footer">
                        <p>&copy; utuezi 2017</p>
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
                        <table id="simple-board">
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

class AllUsers extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {size: 2}
        this.userarray = [];
        //let firstnames userarray.map((firstname
        this.firstnames = [1, 2, 3];
        this.lastnames = [1, 2, 3];
        this.arrayemails = [3, 2, 1];
    }

    componentDidMount()
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
                        <table id="simple-board">
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
                <nav class="navbar navbar-toggleable-md navbar-inverse bg-success fixed-top">
                    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="#">utuezi</a>

                    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="#" onClick={this.props.toUsers}>Users<span
                                    class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="#" onClick={this.props.toLogin}>Log In</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="#" onClick={this.props.toAllAppointments}>Appointments</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="#" onClick={this.props.toProfile}>Profile</a>
                            </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="text" placeholder="Search by Month"/>
                            <button class="btn btn-warning my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>

                <div class="container">

                    <div class="starter-template">
                        <h1>Welcome to utuezi!</h1>
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
