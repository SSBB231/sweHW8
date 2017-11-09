import React, {Component} from 'react';
// import logo from './logo.svg';
// import './bootstrap.css';
// import './starter-template.css';

class App extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {view:"home", user: null};
    }

    componentDidMount()
    {
        //fetch celine from the user database
        fetch('users/cdione')
            .then((response)=>
            {
                return response.json();
            })
            .then((retrievedUser)=>
            {
                this.setState({user: retrievedUser});
            })
            .catch((error)=>
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

    changeToAllAppointmentsScreen()
    {
        this.setState({view: "allappointments"});
    }

    changeToUsersScreen()
    {
        // alert("Changing to All Users Screen");
        this.setState({view:"users"});
    }

    changeToHomeScreen()
    {
        // alert("Changing to Home Screen");
        this.setState({view:"home"});
    }

    changeToLogin()
    {
        this.setState({view:"login"});
    }

    render()
    {
        if(this.state.view === "home")
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
                    <HomeScreen toUsers={()=>this.changeToUsersScreen()} toLogin={()=>this.changeToLogin()}/>
                </div>
            );
        }
        else if(this.state.view === "users")
        {
            return (
                <div class="App">
                    <h1>These Are All the App's Registered Users</h1>
                    <AllUsers/>
                    <br/>
                    <button onClick={()=>this.changeToHomeScreen()}>Go Back to Homescreen</button>
                </div>
            );
        }
        else if(this.state.view ==="login")
        {
            return (
                <Login toHome={()=>this.changeToHomeScreen()}/>
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
        this.state = {fetched: false};
    }

    componentDidMount()
    {
        //fetch appointments for the current user
        fetch('users/'+this.props.user.username+'/appointments')
            .then((response)=>
            {
                return response.json();
            })
            .then((appointments)=>
            {

            })
            .catch((error)=>
            {
                console.log(error);
            });

        this.setState({fetched: true});
    }

    render()
    {
        if(this.state.fetched)
        {
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
                <h1>Login Page</h1>
                <p>Main Content Here</p>
                <button onClick={this.props.toHome}>Go Back to Homescreen</button>
            </div>
        )
    }
}

class CelinesAppointments extends Component {

    constructor(props) {
        super(props);

        this.state = {size: 2};
        this.userarray = [];
        //let firstnames userarray.map((firstname
        this.firstnames = [1, 2, 3];
        this.lastnames = [1, 2, 3];
        this.arrayemails = [3, 2, 1];
    }

    componentDidMount() {

        fetch('/users/cdione/appointments/')
            .then(response => {
                return response.json();
            })
            .then((json) => {
                this.userarray = json;
                console.log("FETCHED APPOINTMENTS");
                console.log(this.userarray);
                this.firstnames = this.userarray.map((user) => user.name);
                this.lastnames = this.userarray.map((user) => user.lastName);

                this.arrayemails = this.userarray.map((user) => user.email);
                this.setState({fetched: "true"});
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        let rows = [];
        let count = 0;
        for (var i = 0; i < this.userarray.length/2; i++) {
            let rowID = `row${i}`
            let cell = []

            for (var idx = 0; idx < 2; idx++) {
                let cellID = `cell${i}-${idx}`
                if(count%2==0)
                    cell.push(<td key={cellID} id={cellID}>{this.firstnames[count]+" "+this.lastnames[count]}</td>)
                else
                    cell.push(<td key={cellID} id={cellID}>{this.arrayemails[count-1]}</td>)

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

class AllUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {size: 2}
        this.userarray = [];
        //let firstnames userarray.map((firstname
        this.firstnames = [1, 2, 3];
        this.lastnames = [1, 2, 3];
        this.arrayemails = [3, 2, 1];
    }

    componentDidMount() {

        fetch('/users/')
            .then(response => {
                return response.json();
            })
            .then((json) => {
                this.userarray = json;
                console.log(this.userarray);
                this.firstnames = this.userarray.map((user) => user.name);
                this.lastnames = this.userarray.map((user) => user.lastName);

                this.arrayemails = this.userarray.map((user) => user.email);
                this.setState({fetched: "true"});
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        let rows = [];
        let count = 0;
        for (var i = 0; i < this.userarray.length/2; i++) {
            let rowID = `row${i}`
            let cell = []

            for (var idx = 0; idx < 2; idx++) {
                let cellID = `cell${i}-${idx}`
                if(count%2==0)
                    cell.push(<td key={cellID} id={cellID}>{this.firstnames[count]+" "+this.lastnames[count]}</td>)
                else
                    cell.push(<td key={cellID} id={cellID}>{this.arrayemails[count-1]}</td>)

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
