import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { NavBar, Homepage, Cryptocurrencies, News, CryptoDetails, Exchanges } from './components';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import store from './app/store';
import 'antd/dist/antd.min.css';
import './App.scss';

const App = () => {
  return (
      <div className="App">
          <div className="navbar">
              <NavBar />
          </div>
          <div className="main">
            <Layout>
                <Routes >
                      <Route exact path='/' element={<Homepage />}>
                          
                      </Route>
                      <Route path='/cryptocurrencies' element={<Cryptocurrencies />}>
                          
                      </Route>
                      <Route path='/cryptoDetail/:coinId' element={<CryptoDetails />}>
                          
                      </Route>
                      <Route path='/exchanges' element={<Exchanges />}>
                          
                      </Route>
                      <Route path='/news' element={<News />}>
                          
                      </Route>
                  </Routes>
            </Layout>

            <div className="footer">
              <Typography.Title level={5} style={{ color: 'white', textAlign: 'center', background: 'black'}}>
                  Cryptoverse <br></br>
                  All rights reserverd <br></br>

                  <Space>
                    <Link to='/'>Home</Link>
                    <Link to='/exchange'>exchanges</Link>
                    <Link to='/news'>news</Link>
                </Space>
              </Typography.Title>
            </div>
          </div>
      </div>
  );
}

export default App;
