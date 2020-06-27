import React from 'react';
import {Link} from 'react-router-dom';
import './header.css'

export default function Header() {
    return (
        <nav class="navbar navbar-expand-lg">
            <Link class="navbar-brand navd" to="/">Assignment</Link>
            <button class="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <Link class="nav-item nav-link" to="/">Home </Link>
                <Link class="nav-item nav-link" to="/showdata">ShowData</Link>
                </div>
            </div>
        </nav>

    )
}
