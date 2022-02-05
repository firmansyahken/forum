import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Layout, Member, Profile, Detail, Account, AddPost, EditPost, Login, Register, EditProfile, Category, Search } from '../pages';
import Auth from './Auth';
import Guest from './Guest';

const Routers = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/search/:keyword" element={<Search />} />
                <Route path="/member" element={<Member />} />
                <Route path="/profile/:name" element={<Profile />} />
                <Route path="/account" element={<Auth><Account /></Auth>} />
                <Route path="/account/edit" element={<Auth><EditProfile/></Auth>} />
                <Route path="/add" element={<Auth><AddPost /></Auth>} />
                <Route path="/edit/:id" element={<Auth><EditPost /></Auth>} />
                <Route path="/detail/:id" element={<Auth><Detail/></Auth>} />
            </Route>
            <Route path="/login" element={<Guest><Login/></Guest>} />
            <Route path="/register" element={<Guest><Register/></Guest>} />
        </Routes>
      </BrowserRouter>
  );
};

export default Routers;
