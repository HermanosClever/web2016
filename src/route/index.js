import React from 'react';

import { IndexRoute, Route } from 'react-router';

import Layout from 'layout';

import CounterView from 'view/counter';
import Home from 'view/home';
import NotFound from 'view/not-found';
import Setting from 'view/setting';

import Login from 'component/backoffice/login';
import Backoffice from 'component/backoffice/backoffice';
import BackofficeHome from 'component/backoffice/home';
import Proyectos from 'component/backoffice/proyectos';
import Clientes from 'component/backoffice/clients';
import Nosotros from 'component/backoffice/us';
import Contacto from 'component/backoffice/contact';
import AgregarProyecto from 'component/backoffice/agregar-proyecto';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />

    <Route path="/backoffice" component={Login} />
    <Route path="/backoffice/menu" component={Backoffice} />
    <Route path="/backoffice/home" component={BackofficeHome} />
    <Route path="/backoffice/proyectos" component={Proyectos} />
    <Route path="/backoffice/clientes" component={Clientes} />
    <Route path="/backoffice/nosotros" component={Nosotros} />
    <Route path="/backoffice/contacto" component={Contacto} />
    <Route path="/backoffice/agregar-proyecto" component={AgregarProyecto} />

    <Route path="/contador" component={CounterView} />
    <Route path="/settings" component={Setting} />
    <Route path="*" component={NotFound} />
  </Route>
);
