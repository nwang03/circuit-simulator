import "./App.css";
import HomePage from "./HomePage";
import RCpage from "./RCpage";
import RLpage from "./RLpage";
import LCpage from "./LCpage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/RC" component={RCpage} />
                    <Route path="/RL" component={RLpage} />
                    <Route path="/LC" component={LCpage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
