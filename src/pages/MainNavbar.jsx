import React from 'react'
import { Outlet, Link } from "react-router-dom";
import BasicCard from '../components/BasicCard';

export default function MainNavbar() {
  const imageBasePath =
    window.location.protocol + "//" + window.location.host + "/dist/img/";
  return (
    <>
      <div className="wrapper">
        {/* Preloader */}
        <div className="preloader flex-column justify-content-center align-items-center">
          <img className="animation__shake" src={imageBasePath + "AdminLTELogo.png"} alt="AdminLTELogo" height={60} width={60} />
        </div>

        {/* Navbar */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Profile */}
            <li className="nav-item">
              <div className="user-panel pb-3 d-flex">
                <div className="image">
                  <img  src={imageBasePath + "user2-160x160.jpg"} className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                  <a href="#" className="d-block">Admin PPS</a>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        {/* /.navbar */}
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <img  src={imageBasePath + "AdminLTELogo.png"} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light">Arsip PPS</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                  <Link to="/" role="button" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li className="nav-header">Surat</li>
                <li className="nav-item">
                  <Link to="/surat/keluar" className="nav-link">
                    <i className="nav-icon fas fa-paper-plane" />
                    <p>
                      Surat Keluar
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/surat/masuk" className="nav-link">
                    <i className="nav-icon  fas fa-inbox" />
                    <p>
                      Surat Masuk
                    </p>
                  </Link>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>

        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
            </div>{/* /.container-fluid */}
          </section>
          {/* Main content */}
          
          <BasicCard>
            <Outlet />
          </BasicCard>
          {/* /.content */}
        </div>

        <footer className="main-footer">
          <div className="float-right d-none d-sm-block">
            <b>Version</b> 3.2.0
          </div>
          <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
        </footer>

        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>


      </div>
    </>
  );
}
