import { ScrapedPage } from "../../src/modules/extractors";
import { QnaPageUrl } from "../../src/modules/parsing";

export default {
    url: "https://www.robotevents.com/vexu/2023-2024/QA?page=1",
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
                        Q&amp;A: VEXU 2023-2024: Over Under : Robot Events
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
            body:before {background:url("/images/bg/bg1.svg") repeat;display:block;content:"";position:absolute;z-index:-1;top:165px;left:0;right:0;height:80%;opacity:0.75}
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
                                Official Q&amp;A: VEXU 2023-2024: Over Under
                        </h1>
    
            <div>
                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/guidelines"
                   class="btn btn-primary btn-sm">
                    Usage Guidelines
                </a>
            
                    </div>
        </div>
    
        <div id="faq">
                
        <p>Welcome to the official VEX U Question &amp; Answer system, where all registered teams have the opportunity to ask for official rules interpretations and clarifications. This Q&amp;A system is the only source for official VEX U Over Under rules clarifications, and the clarifications made here from the Game Design Committee (GDC) are considered as official and binding as the written <a href="https://link.vex.com/docs/23-24/vrc-over-under/GameManual">Game Manual</a> itself.</p>
    <p><strong>Please review the <a href="https://robotevents.com/VEXU/2023-2024/QA/guidelines">Q&amp;A Usage Guidelines</a> before posting</strong>.  This system is only intended for specific VEX U Over Under rules questions.</p>
    <ul>
    <li>For event, registration, or other competition support questions, please contact your <a href="https://www.robotevents.com/support">REC Foundation Manager</a>.</li>
    <li>For VEX technical support, contact <a href="/cdn-cgi/l/email-protection#b8cbcdc8c8d7caccf8ceddc096dbd7d5"><span class="__cf_email__" data-cfemail="71020401011e0305310714095f121e1c">[email&#160;protected]</span></a> or <a href="/cdn-cgi/l/email-protection#acdfcdc0c9dfecdac9d482cfc3c1"><span class="__cf_email__" data-cfemail="384b59545d4b784e5d40165b5755">[email&#160;protected]</span></a>.</li>
    <li>For game questions, suggestions, or concerns outside of specific and official rules questions, contact <a href="/cdn-cgi/l/email-protection#abecefe8ebddced385c8c4c6"><span class="__cf_email__" data-cfemail="93d4d7d0d3e5f6ebbdf0fcfe">[email&#160;protected]</span></a>.</li>
    </ul>
    
    
    
        <div class="row">
            <div class="col-sm-4">
                <form method="GET" action="https://www.robotevents.com/VURC/2023-2024/QA" accept-charset="UTF-8">
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
                            <a href="https://www.robotevents.com/faqs/37/pdf">
                                All Questions
                            </a>
                        </li>
                        <li class="dropdown-item">
                            <a href="https://www.robotevents.com/faqs/37/pdf?important=1">
                                Starred Questions
                            </a>
                        </li>
                    </ul>
                </div>
                        </div>
        </div>
    
                <hr>
                                <a href="https://www.robotevents.com/VURC/2023-2024/QA?filter=new_question"
                       class="btn btn-danger" style="margin-bottom: 1em">
                    <i class="fa fa-filter"></i>
    
                    New Questions
    
                    <span class="badge badge-secondary">46</span>
                </a>
                        <a href="https://www.robotevents.com/VURC/2023-2024/QA?filter=new_answer"
                       class="btn btn-danger" style="margin-bottom: 1em">
                    <i class="fa fa-filter"></i>
    
                    New Answers
    
                    <span class="badge badge-secondary">44</span>
                </a>
                
        <br>
        
        <div class="card mb-3 " >
        
                            <div class="card-body">
                    <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1969">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    VexU Inspection &amp; firmware.
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            Max Johnson (Event Partner)
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            24-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1946">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Does match load placement legality depend on the mechanism used?
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            WISCO
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            9-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1945">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    &lt;VUG4&gt; Head Referee Judgement
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            HAIL
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            9-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1942">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Match loading and Q and A 1924 clarification
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            Evan Rogerson
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            8-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1932">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    VUG4 - Further clarification on the match load bar and field perimeter
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            BLRS2
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            4-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1927">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    &lt;VUR9&gt; Using a commercially available D-Ring as a Fastener
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            MINES
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            3-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1925">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Legal Match Load Placement
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            PLATT2
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            1-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1924">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Match loading and Q and A 1857 clarification
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            Evan Rogerson
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            1-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1923">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    Placing Match Loads that lean against the Match Load Bar
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            1565X
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            1-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                                                    <hr>
                            <h4 class="title">
                                        <a href="https://www.robotevents.com/VURC/2023-2024/QA/1922">
                                                        <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                    VUG4 Match Loading – Triball Placement
                        </a>
                    
                                </h4>
    
                <div class="question">
                    <div class="details">
                        <div class="author">
                            <i class="fa fa-fw fa-group"></i>
                            AUBIE1
                        </div>
                        <div class="timestamp">
                            <i class="fa fa-fw fa-calendar"></i>
                            1-Feb-2024
                        </div>
                    </div>
    
                                </div>
    
                <div class="tags clearfix">
                                                                                <span class="badge bg-danger me-2">New Question</span>
                                                                    <span class="badge bg-success me-2">New Answer</span>
                                                                    </div>
                        
            <div class="mt-3 d-flex justify-content-center">
                <nav>
            <ul class="pagination d-flex d-md-flex">
                
                                <li class="page-item disabled" aria-disabled="true" aria-label="&laquo; Previous">
                        <span class="page-link" aria-hidden="true">&lsaquo;</span>
                    </li>
                
                
                                
                    
                    
                                                                                            <li class="page-item active" aria-current="page"><span class="page-link">1</span>
                                </li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/VURC/2023-2024/QA?page=2">2</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/VURC/2023-2024/QA?page=3">3</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/VURC/2023-2024/QA?page=4">4</a></li>
                                                                                                    <li class="page-item"><a class="page-link" href="https://www.robotevents.com/VURC/2023-2024/QA?page=5">5</a></li>
                                                                            
                
                                <li class="page-item">
                        <a class="page-link" href="https://www.robotevents.com/VURC/2023-2024/QA?page=2" rel="next"
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
                    Email: <a href="/cdn-cgi/l/email-protection#b2c1c7c2c2ddc0c6f2c0ddd0ddc6d7c4d7dcc6c19cd1dddf"><span class="__cf_email__" data-cfemail="ff8c8a8f8f908d8bbf8d909d908b9a899a918b8cd19c9092">[email&#160;protected]</span></a>
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
} satisfies ScrapedPage<QnaPageUrl>;
