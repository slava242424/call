import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import CallsList from './pages/CallsList';
import CallDetails from './pages/CallDetails';
import CallForm from './pages/CallForm';
import ClientsList from './pages/ClientsList';
import ClientDetails from './pages/ClientDetails';
import ClientForm from './pages/ClientForm';
import RequestsList from './pages/RequestsList';
import RequestDetails from './pages/RequestDetails';
import RequestForm from './pages/RequestForm';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            <Route path="/calls" element={<CallsList />} />
            <Route path="/calls/:id" element={<CallDetails />} />
            <Route path="/calls/new" element={<CallForm />} />
            <Route path="/calls/edit/:id" element={<CallForm />} />
            
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/:id" element={<ClientDetails />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/edit/:id" element={<ClientForm />} />
            
            <Route path="/requests" element={<RequestsList />} />
            <Route path="/requests/:id" element={<RequestDetails />} />
            <Route path="/requests/new" element={<RequestForm />} />
            <Route path="/requests/edit/:id" element={<RequestForm />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;