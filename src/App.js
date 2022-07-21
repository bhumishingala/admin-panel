import { Route, Switch } from 'react-router-dom';
import Layout from './compontent/layout/Layout';
import Medicinces from './containers/medicines/Medicinces';
import Patients from './containers/patient/Patients';
import Doctors from './containers/doctors/Doctors';
import { Provider } from 'react-redux';
import { conFigureStore } from './reduex/Store';
import Counter from './containers/counter/Counter';

function App() {
  const store = conFigureStore();

  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path={"/medicines"} exact component={Medicinces} />
            <Route path={"/patients"} exact component={Patients} />
            <Route path={"/doctors"} exact component={Doctors} />
            <Route path={"/counter"} exact component={Counter} />
          </Switch>
        </Layout>
      </Provider>
    </>
  );
}

export default App;
