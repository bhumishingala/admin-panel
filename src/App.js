import { Route, Switch } from 'react-router-dom';
import Layout from './compontent/layout/Layout';
import Medicinces from './containers/medicines/Medicinces';
import Patients from './containers/patient/Patients';
import Doctors from './containers/doctors/Doctors';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path={"/medicines"} exact component={Medicinces} />
          <Route path={"/patients"} exact component={Patients} />
          <Route path={"/doctors"} exact component={Doctors}/>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
