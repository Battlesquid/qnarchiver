import { ScrapedPage } from "../../src/modules/extractors";
import { QnaHomeUrl } from "../../src/modules/parsing";

export default {
    url: "https://www.robotevents.com/V5RC/2023-2024/QA",
    html: `
<!DOCTYPE html>
    <html lang="en">
    <head class="h-100">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="Slmnr2Qk67JjIpcbcqzk9oW2q4PhKc1ziEKQqbzm">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
            <title>
                        Q&amp;A: VRC 2023-2024: Over Under : Robot Events
                </title>
        <script>
            window._sentry = {
                init: {
                    dsn: "https://f54cedb33b944c03a4832bafb1b33824@sentry.io/1763120",
                    environment: "production",
                    release: "58e3b9d",
                }
            };
            </script>
        <link rel="preload" as="style" href="https://www.robotevents.com/build/assets/dataTables-00883630.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/FrontMultiSelect-b32a2158.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/app-5f4ca076.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/app-c127fe17.css" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/app-5c3f47c5.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_commonjsHelpers-de833af9.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/dataTables.buttons-5a95f149.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/fetch-1d2a67eb.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/index-ef3860a3.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/moment-e9e012b5.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/index-6795db67.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/jquery-b3a262f9.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/bootstrap.esm-aafebd7f.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/inherits_browser-2c87d58f.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_plugin-vue_export-helper-2d65c30a.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/instance-51db2296.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_commonjs-dynamic-modules-302442b1.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/FrontMultiSelect-a41890c4.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/index-5afb2ce7.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/popper-528ebbd5.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/optionsMixin-877354eb.js" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/dataTables-00883630.css" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/FrontMultiSelect-b32a2158.css" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/app-5f4ca076.css" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/app-c127fe17.css" /><script type="module" src="https://www.robotevents.com/build/assets/app-5c3f47c5.js"></script>    <script>
            var global = window;
        </script>
    
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.css" rel="stylesheet" />
    
        <style>
            body:before {background:url("/images/bg/bg2.svg") repeat;display:block;content:"";position:absolute;z-index:-1;top:165px;left:0;right:0;height:80%;opacity:0.75}
        </style>
            
        <link rel="preload" as="style" href="https://www.robotevents.com/build/assets/index-21ed0cdf.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/votes-e3b0c442.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/FrontMultiSelect-b32a2158.css" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/faqs-94b62802.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_plugin-vue_export-helper-2d65c30a.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/index-78f2aad7.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/votes-4cc95ac2.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/FrontMultiSelect-a41890c4.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/popper-528ebbd5.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_commonjsHelpers-de833af9.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/optionsMixin-877354eb.js" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/index-21ed0cdf.css" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/votes-e3b0c442.css" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/FrontMultiSelect-b32a2158.css" /><script type="module" src="https://www.robotevents.com/build/assets/faqs-94b62802.js"></script>
        <style>
            blockquote {
                background-color: #dddddd;
                margin: 2em;
                padding: 2em;
                border: darkslategray 2px solid;
                font-style: italic;
                border-radius: 15px;
            }
        </style>
    </head>
    <body class="d-flex flex-column min-vh-100">
        <div id="header-wrap" class="mb-3 bg-white">
            <div class="container header d-none d-lg-block mb-2">
        <div class="d-flex justify-content-between align-items-center">
            <div class="flex-grow-1">
                <a href="https://www.robotevents.com">
                                                                <img src="https://www.robotevents.com/images/robotevents-logo-cropped.png" class="navbar-brand-image" alt="RobotEvents.com">
                                                    </a>
            </div>
    
            <div class="d-none d-xl-block col-xs-6 flex-grow-1">
                <div class="header-slogan" class="hidden-xs">
                    <strong>
                        Robotics Education &amp; Competition Foundation
                    </strong>
                    <br>
                    Inspiring students, one robot at a time.
                </div>
            </div>
    
            <div class="flex-grow-1 mt-2">
                <a href="https://recf.org">
                     <img src="https://www.robotevents.com/images/rec-foundation.png?20221006" class="navbar-brand-image recf-logo pull-right" alt="Robotics Education & Competition Foundation">
                </a>
            </div>
        </div>
    </div>
            <nav class="navbar navbar-light navbar-expand-lg" id="main-nav">
        <div class="container">
            <div class="navbar-header d-lg-none d-flex justify-content-between flex-grow-1">
                <div class="flex-grow-1 navbar-brand-container">
                <a href="https://www.robotevents.com" class="navbar-brand-custom flex-grow-1">
                    <img src="https://www.robotevents.com/images/robotevents-logo-cropped.png" class="img-fluid navbar-brand-image" alt="RobotEvents.com">
                </a>
                </div>
                <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar-collapse-1"
                        aria-controls="navbar-collapse-1"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse justify-content-lg-between" id="navbar-collapse-1" style="padding: 0">
                <ul class="navbar-nav">
                <li  class="nav-item">
        <a  href="https://www.robotevents.com" class="nav-link">
                        <i class="circle-o"></i>
            
            
            Home
    
            <span class="caret"></span>
        </a>
    
        
        </li>
    
                        <li class="divider-vertical d-none d-lg-block"></li>
                        <li  class="nav-item dropdown">
        <a  href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" >
                        <i class="circle-o"></i>
            
            
            Competitions
    
            <span class="caret"></span>
        </a>
    
                <div class="dropdown-menu" aria-label="Competitions">
                <div class="d-md-flex">
                                        <ul class="list-unstyled flex-grow-1 mb-3">
                            <li class="ps-3">
                                <strong>VEX</strong>
                            </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/vex-iq-competition" class="dropdown-item">
            VEX IQ Robotics Competition
        </a>
    </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/vex-robotics-competition" class="dropdown-item">
            VEX V5 Robotics Competition
        </a>
    </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/college-competition" class="dropdown-item">
            VEX U Robotics Competition
        </a>
    </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/vex-ai-competition" class="dropdown-item">
            VEX AI Robotics Competition
        </a>
    </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/vex-factory-automation-competition" class="dropdown-item">
            VEX  Factory Automation Competition
        </a>
    </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/tsaviqc" class="dropdown-item">
            TSA VEX IQ Robotics Competition
        </a>
    </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/tsavrc" class="dropdown-item">
            TSA VEX Robotics Competition
        </a>
    </li>
                                                </ul>
                                        <ul class="list-unstyled flex-grow-1 mb-3">
                            <li class="ps-3">
                                <strong>Drones</strong>
                            </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/adc" class="dropdown-item">
            Aerial Drone Competition
        </a>
    </li>
                                                </ul>
                                        <ul class="list-unstyled flex-grow-1 mb-3">
                            <li class="ps-3">
                                <strong>Other</strong>
                            </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/workshops" class="dropdown-item">
            Workshops &amp; Camps
        </a>
    </li>
                                                        <li>
        <a href="https://www.robotevents.com/robot-competitions/national-robotics-league" class="dropdown-item">
            National Robotics League
        </a>
    </li>
                                                </ul>
                                </div>
            </div>
        
        </li>
    
                        <li class="divider-vertical d-none d-lg-block"></li>
                        <li  class="nav-item dropdown">
        <a  href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" >
                        <i class="circle-o"></i>
            
            
            Resources
    
            <span class="caret"></span>
        </a>
    
        
                <ul class="dropdown-menu" aria-label="Resources">
                                <li>
        <a href="https://www.robotevents.com/support" class="dropdown-item">
            Support
        </a>
    </li>
                                <li>
        <a href="https://www.robotevents.com/map" class="dropdown-item">
            Map Search
        </a>
    </li>
                                <li>
        <a href="https://recf.org/about-us/contact-us/" class="dropdown-item">
            Contact Us
        </a>
    </li>
                                <li>
        <a href="https://www.robotevents.com/webcasts" class="dropdown-item">
            Webcasts
        </a>
    </li>
                        </ul>
        </li>
    
                        <li class="divider-vertical d-none d-lg-block"></li>
                        <li  class="nav-item">
        <a  href="https://www.robotevents.com/grants" class="nav-link">
                        <i class="circle-o"></i>
            
            
            Grants
    
            <span class="caret"></span>
        </a>
    
        
        </li>
    
                </ul>
                <ul class="navbar-nav">
                <li  class="nav-item dropdown">
        <a  href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" >
                        <i class="fa fa-fw fa-globe"></i>
            
            
            en
    
            <span class="caret"></span>
        </a>
    
        
                <ul class="dropdown-menu" aria-label="en">
                                <li>
        <a href="/lang/en" class="dropdown-item">
            en (English)
        </a>
    </li>
                                <li>
        <a href="/lang/ar" class="dropdown-item">
            ar (العربية)
        </a>
    </li>
                                <li>
        <a href="/lang/es" class="dropdown-item">
            es (Español)
        </a>
    </li>
                                <li>
        <a href="/lang/de" class="dropdown-item">
            de (Deutsche)
        </a>
    </li>
                                <li>
        <a href="/lang/fr" class="dropdown-item">
            fr (Français)
        </a>
    </li>
                                <li>
        <a href="/lang/pt" class="dropdown-item">
            pt (Português)
        </a>
    </li>
                                <li>
        <a href="/lang/zh-CN" class="dropdown-item">
            zh-CN (中国 - 简体中文)
        </a>
    </li>
                        </ul>
        </li>
    
                        <li class="divider-vertical d-none d-lg-block"></li>
                        <li  class="nav-item">
        <a  href="https://www.robotevents.com/auth/register" class="nav-link">
                        <i class="circle-o"></i>
            
            
            Register
    
            <span class="caret"></span>
        </a>
    
        
        </li>
    
                        <li class="divider-vertical d-none d-lg-block"></li>
                        <li  class="nav-item">
        <a  href="https://www.robotevents.com/auth/login" class="nav-link">
                        <i class="circle-o"></i>
            
            
            Login
    
            <span class="caret"></span>
        </a>
    
        
        </li>
    
                </ul>
            </div>
        </div>
    </nav>
        </div>
    
        <main class="flex-auto flex-grow-0">
            <div class="container" id="front-app">
                                
            <div class="alert alert-warning">
                        <p>This Q&amp;A is Read Only.</p>
                        </div>
        
        <div class="d-flex justify-content-between align-items-baseline">
            <h1 class="page-header">
                                Official Q&amp;A: VRC 2023-2024: Over Under
                        </h1>
    
            <div>
                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/guidelines"
                   class="btn btn-primary btn-sm">
                    Usage Guidelines
                </a>
            
                    </div>
        </div>
    
        <div id="faq">
                
        <p>Welcome to the official VEX Robotics Competition Question &amp; Answer system, where all registered teams have the opportunity to ask for official rules interpretations and clarifications. This Q&amp;A system is the only source for official VRC Over Under rules clarifications, and the clarifications made here from the Game Design Committee (GDC) are considered as official and binding as the written <a href="https://link.vex.com/docs/23-24/vrc-over-under/GameManual">Game Manual</a> itself.</p>
    <p><strong>Please review the <a href="https://robotevents.com/VRC/2023-2024/QA/guidelines">Q&amp;A Usage Guidelines</a> before posting</strong>.  This system is only intended for specific VRC Over Under rules questions.</p>
    <ul>
    <li>For event, registration, or other competition support questions, please contact your <a href="https://www.robotevents.com/support">REC Foundation Manager</a>.</li>
    <li>For VEX technical support, contact <a href="/cdn-cgi/l/email-protection#cfbcbabfbfa0bdbb8fb9aab7e1aca0a2"><span class="__cf_email__" data-cfemail="c1b2b4b1b1aeb3b581b7a4b9efa2aeac">[email&#160;protected]</span></a> or <a href="/cdn-cgi/l/email-protection#f48795989187b482918cda979b99"><span class="__cf_email__" data-cfemail="5526343930261523302d7b363a38">[email&#160;protected]</span></a>.</li>
    <li>For game questions, suggestions, or concerns outside of specific and official rules questions, contact <a href="/cdn-cgi/l/email-protection#da9d9e999aacbfa2f4b9b5b7"><span class="__cf_email__" data-cfemail="b9fefdfaf9cfdcc197dad6d4">[email&#160;protected]</span></a>.</li>
    </ul>
    
    
    
        <div class="row">
            <div class="col-sm-4">
                <form method="GET" action="https://www.robotevents.com/V5RC/2023-2024/QA" accept-charset="UTF-8">
                <div class="input-group">
                    <input type="text"
                           class="form-control"
                           placeholder="Search"
                           name="query"
                           id="query"
                           value="">
                    <span class="input-group-btn">
                        <button class="btn btn-default">Search</button>
                    </span>
                </div>
                </form>
            </div>
            <div class="col-sm-8 text-right">
                <div class="btn-group">
                    <button type="button"
                            class="btn btn-warning dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        <i class="fa fa-fw fa-download"></i>
                        Download PDF
                        <span class="caret"></span>
                    </button>
    
                    <ul class="dropdown-menu">
                                            <li class="dropdown-item">
                            <a href="https://www.robotevents.com/faqs/36/pdf">
                                All Questions
                            </a>
                        </li>
                        <li class="dropdown-item">
                            <a href="https://www.robotevents.com/faqs/36/pdf?important=1">
                                Starred Questions
                            </a>
                        </li>
                    </ul>
                </div>
                        </div>
        </div>
    
                <hr>
                                <a href="https://www.robotevents.com/V5RC/2023-2024/QA?filter=new_question"
                       class="btn btn-danger" style="margin-bottom: 1em">
                    <i class="fa fa-filter"></i>
    
                    New Questions
    
                    <span class="badge badge-secondary">279</span>
                </a>
                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA?filter=new_answer"
                       class="btn btn-danger" style="margin-bottom: 1em">
                    <i class="fa fa-filter"></i>
    
                    New Answers
    
                    <span class="badge badge-secondary">278</span>
                </a>
                
        <br>
        
        <div class="card mb-3 " >
        
                            <div class="card-body">
                    <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1990">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Pushing triballs causes net to lift slightly
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            Charles Jeffries (Event Partner)
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            5-Mar-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                            <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/T10"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            T10
                        </a>&nbsp;
                                </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1989">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Can alliance&#039;s team load ball to another robot?
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            1065A
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            3-Mar-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                            <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/SG6"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            SG6
                        </a>&nbsp;
                                </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1988">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Regarding the valid triball
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            1065A
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            3-Mar-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                            <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/SC7"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            SC7
                        </a>&nbsp;
                                </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1987">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Swapping of Subsystem 3
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            Johnson Ting (Event Partner)
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            2-Mar-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                            <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/R1"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            R1
                        </a>&nbsp;
                                </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1986">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Clarification R3
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            18888A
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            2-Mar-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                            <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/R3"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            R3
                        </a>&nbsp;
                                </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1979">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Height Guide Measurement Doesn’t Match Game Manual
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            1082X
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            29-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                            <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/SC6"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            SC6
                        </a>&nbsp;
                                </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1978">
                                                    Entanglement in rollers
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            4611A
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            28-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                                                <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/G13"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            G13
                        </a>&nbsp;
                                </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1977">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Double Match Loading Clarification / Illegal Match Loading in Skills
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            323V
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            28-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                            <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/SG6"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            SG6
                        </a>&nbsp;
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/RSC1"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            RSC1
                        </a>&nbsp;
                                </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1975">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    tipping blocking robots
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            84260C
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            27-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                            <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/G13"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            G13
                        </a>&nbsp;
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/G14"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            G14
                        </a>&nbsp;
                                </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/1974">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    &quot;placing tribals onto/into robot&quot;
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            chris kelly
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            27-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                            <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/SG6"
                           class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            SG6
                        </a>&nbsp;
                                </div>
                        
            <div class="mt-3 d-flex justify-content-center">
                <nav>
            <ul class="pagination d-flex d-md-flex">
                
                                <li class="page-item disabled" aria-disabled="true" aria-label="&laquo; Previous">
                        <span class="page-link" aria-hidden="true">&lsaquo;</span>
                    </li>
                
                
                                
                    
                    
                                                                                            <li class="page-item active" aria-current="page"><span class="page-link">1</span>
                                </li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=2">2</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=3">3</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=4">4</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=5">5</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=6">6</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=7">7</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=8">8</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=9">9</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=10">10</a></li>
                                                                                            
                                        <li class="page-item disabled" aria-disabled="true"><span class="page-link">...</span>
                        </li>
                    
                    
                                                
                    
                    
                                                                                            <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=27">27</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=28">28</a></li>
                                                                            
                
                                <li class="page-item">
                        <a class="page-link" href="https://www.robotevents.com/V5RC/2023-2024/QA?page=2" rel="next"
                           aria-label="Next &raquo;">&rsaquo;</a>
                    </li>
                        </ul>
        </nav>
    
            </div>
                </div>
                
        
        </div>
        </div>
                <div style="padding-bottom: 20px"></div>
            </div>
        </main>
    
        <footer class="footer mt-auto flex-shrink-0 py-2">
        <div class="container d-lg-block">
            <div class=" row">
                <div class="col">
                    <strong>Robotics Education &amp; Competition Foundation</strong><br />
                    1519 INTERSTATE HIGHWAY 30 W<br />
                    Greenville, TX 75402<br />
                    <span class="email">
                    Email: <a href="/cdn-cgi/l/email-protection#b4c7c1c4c4dbc6c0f4c6dbd6dbc0d1c2d1dac0c79ad7dbd9"><span class="__cf_email__" data-cfemail="f98a8c8989968b8db98b969b968d9c8f9c978d8ad79a9694">[email&#160;protected]</span></a>
                </span>
                </div>
                <div class="col">
                    <small>&copy; 2024 Robotics Education &amp; Competition Foundation.</small><br>
                    <small>All rights reserved. All other names/trademarks are the property of their respective owners.</small><br>
                    <small><a href="https://www.robotevents.com/privacy-policy"><span style="color: #ffffff">Privacy Policy</span></a></small>
                    <span style="color: #cccccc">|</span>
                    <small><a href="https://www.robotevents.com/terms-of-service"><span style="color: #ffffff">Terms of Service</span></a></small>
                    <span style="color: #cccccc">|</span>
                    <small><a href="https://www.robotevents.com/acceptable-use"><span style="color: #ffffff">Acceptable Use Policy</span></a></small>
                    <span style="color: #cccccc">|</span>
                    <small><a href="https://www.robotevents.com/refund-policy"><span style="color: #ffffff">Refund Policy</span></a></small><br>
                    <small><a href="https://www.robotevents.com/nonprofit-disclosures"><span style="color: #ffffff">State Nonprofit Disclosures</span></a></small><br>
                </div>
            </div>
        </div>
    </footer>
    
        <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script>
            window.ApiUrl = {
                api: "https://www.robotevents.com",
                wss: "sub.robotevents.com"
            };
        </script>
                        <!-- Google tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3RNBNKCMJZ"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
    
        gtag('config', 'G-3RNBNKCMJZ');
    </script>
    
    <!-- McAfee SECURE Trustmark -->
    <script src="https://cdn.ywxi.net/js/1.js" async></script>
    
        </body>
    </html>
`
} satisfies ScrapedPage<QnaHomeUrl>;
