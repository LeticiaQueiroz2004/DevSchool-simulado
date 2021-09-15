
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Produtos from './pages/produtos';
import Error from './pages/error';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Produtos} />
                <Route path="*" component={Error} />
            </Switch>
        </BrowserRouter>
    )
}