import type { ScrapedPage } from "../../src/modules/extractors";
import type { QnaHomeUrl } from "../../src/modules/parsing";

export default {
	url: "https://www.robotevents.com/V5RC/2023-2024/QA",
	html: `<!DOCTYPE html>
<html lang="en">
<head class="h-100">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="oFFJz1Fn0aGKT0A8gU2N36btOJW2X3dJv3EVdKOJ">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
        <title>
                    Q&amp;A: VEX V5 Robotics Competition 2024-2025: High Stakes : Robot Events
            </title>
    <script>
        window._sentry = {
            init: {
                dsn: "https://f54cedb33b944c03a4832bafb1b33824@sentry.io/1763120",
                environment: "production",
                release: "42fb8dc",
            }
        };
        </script>
    <link rel="preload" as="style" href="https://www.robotevents.com/build/assets/dataTables-DCgFvvHb.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/FrontMultiSelect-qABy6wrX.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/app-zhPFw-xP.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/app-Dm3lQqDD.css" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/app-OfXC_LTW.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_commonjsHelpers-BosuxZz1.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/dataTables.buttons-D28Gp9Xo.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/fetch-BDERxYx_.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/moment-zH0z38ay.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/index-DW_MHI2K.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/jquery-DzX1cMbg.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/bootstrap.esm-auRvAJ_r.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/typeof-ZI2KZN5z.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_plugin-vue_export-helper-Dz4ggxAd.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/instance-DOL8Kr4k.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_commonjs-dynamic-modules-TDtrdbi3.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/FrontMultiSelect-C-Z1hPU-.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/index-P2h9gwcW.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/sdk-B4J6oF9I.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/popper-Bt1yUB8z.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/optionsMixin-D_hDTg9H.js" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/dataTables-DCgFvvHb.css" data-navigate-track="reload" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/FrontMultiSelect-qABy6wrX.css" data-navigate-track="reload" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/app-zhPFw-xP.css" data-navigate-track="reload" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/app-Dm3lQqDD.css" data-navigate-track="reload" /><script type="module" src="https://www.robotevents.com/build/assets/app-OfXC_LTW.js" data-navigate-track="reload"></script>    <script>
        var global = window;
    </script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.css" rel="stylesheet" />

    <style>
        body:before {background:url("/images/bg/bg2.svg") repeat;display:block;content:"";position:absolute;z-index:-1;top:165px;left:0;right:0;height:80%;opacity:0.75}
    </style>
        
    <link rel="preload" as="style" href="https://www.robotevents.com/build/assets/index-Boo2WfFi.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/votes-tn0RQdqM.css" /><link rel="preload" as="style" href="https://www.robotevents.com/build/assets/FrontMultiSelect-qABy6wrX.css" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/faqs-T_IW7qGj.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_plugin-vue_export-helper-Dz4ggxAd.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/index-BlWSNe5X.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/votes-CbexMZCi.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/FrontMultiSelect-C-Z1hPU-.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/popper-Bt1yUB8z.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_commonjsHelpers-BosuxZz1.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/optionsMixin-D_hDTg9H.js" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/index-Boo2WfFi.css" data-navigate-track="reload" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/votes-tn0RQdqM.css" data-navigate-track="reload" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/FrontMultiSelect-qABy6wrX.css" data-navigate-track="reload" /><script type="module" src="https://www.robotevents.com/build/assets/faqs-T_IW7qGj.js" data-navigate-track="reload"></script>
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
                            
    <div class="d-flex justify-content-between align-items-baseline">
        <h1 class="page-header">
                            Official Q&amp;A: VEX V5 Robotics Competition 2024-2025: High Stakes
                    </h1>

        <div>
                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/guidelines"
               class="btn btn-primary btn-sm">
                Usage Guidelines
            </a>
        
                </div>
    </div>

    <div id="faq">
            
    <p>Welcome to the official VEX V5 Robotics Competition Question &amp; Answer system, where all registered teams have the opportunity to ask for official rules interpretations and clarifications. This Q&amp;A system is the only source for official V5RC High Stakes rules clarifications, and the clarifications made here from the Game Design Committee (GDC) are considered as official and binding as the written <a href="https://content.vexrobotics.com/docs/2024-2025/v5rc-high-stakes/VRC-HighStakes-2.2.pdf">Game Manual</a> itself.</p>
<p><strong>Please review the <a href="https://robotevents.com/VRC/2024-2025/QA/guidelines">Q&amp;A Usage Guidelines</a> before posting</strong>.  This system is only intended for specific V5RC High Stakes rules questions.</p>
<ul>
<li>For event, registration, or other competition support questions, please contact your <a href="https://www.robotevents.com/support">REC Foundation Regional Support Manager</a>.</li>
<li>For VEX technical support, contact <a href="/cdn-cgi/l/email-protection#04777174746b76704472617c2a676b69"><span class="__cf_email__" data-cfemail="1e6d6b6e6e716c6a5e687b66307d7173">[email&#160;protected]</span></a> or <a href="/cdn-cgi/l/email-protection#6112000d0412211704194f020e0c"><span class="__cf_email__" data-cfemail="582b39343d2b182e3d20763b3735">[email&#160;protected]</span></a>.</li>
<li>For game questions, suggestions, or concerns outside of specific and official rules questions, contact <a href="/cdn-cgi/l/email-protection#60272423201605184e030f0d"><span class="__cf_email__" data-cfemail="0f484b4c4f796a77216c6062">[email&#160;protected]</span></a>.</li>
</ul>



    <div class="row">
        <div class="col-sm-4">
            <form method="GET" action="https://www.robotevents.com/V5RC/2024-2025/QA" accept-charset="UTF-8">
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
                        <a href="https://www.robotevents.com/faqs/41/pdf">
                            All Questions
                        </a>
                    </li>
                    <li class="dropdown-item">
                        <a href="https://www.robotevents.com/faqs/41/pdf?important=1">
                            Starred Questions
                        </a>
                    </li>
                </ul>
            </div>
                            <a href="https://www.robotevents.com/V5RC/2024-2025/QA/ask"
                   class="btn btn-default">
                    <i class="fa fa-fw fa-edit"></i>
                    Ask a Question
                </a>
                    </div>
    </div>

            <hr>
                            <a href="https://www.robotevents.com/V5RC/2024-2025/QA?filter=new_question"
                   class="btn btn-danger" style="margin-bottom: 1em">
                <i class="fa fa-filter"></i>

                New Questions

                <span class="badge badge-secondary">182</span>
            </a>
                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA?filter=new_answer"
                   class="btn btn-danger" style="margin-bottom: 1em">
                <i class="fa fa-filter"></i>

                New Answers

                <span class="badge badge-secondary">170</span>
            </a>
            
    <br>
    
    <div class="card mb-3 " >
    
                        <div class="card-body">
                <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2575">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2575: SG6 Clarification for Double Possession
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        20541B
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        25-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/SG6"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        SG6
                    </a>&nbsp;
                            </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2574">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2574: [SG11] [Q&amp;A 2420] Teams Removing Own Placed Goal
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        Tripp P
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        24-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/SG11"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        SG11
                    </a>&nbsp;
                            </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2566">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2566: R4 &amp; SG2 Robot Status during size measurement for inspection
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        Margaret Trent (Event Partner)
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        24-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/R4"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        R4
                    </a>&nbsp;
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/SG2"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        SG2
                    </a>&nbsp;
                            </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2565">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2565: Forcing a DQ through SG6, G15, and diagonal corner guarding
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        15797A
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        23-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/G15"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        G15
                    </a>&nbsp;
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/SG6"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        SG6
                    </a>&nbsp;
                            </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2564">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2564: Trapping using a mobile goal
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        10540A
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        22-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/SG6"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        SG6
                    </a>&nbsp;
                            </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2558">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2558: G9 Note clarification in regards to Q&amp;A 2541
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        Alex Saikia (Event Partner)
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        20-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/G9"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        G9
                    </a>&nbsp;
                            </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2552">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2552: License plates that are 3D Printed
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        63842A
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        18-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/R8"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        R8
                    </a>&nbsp;
                            </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2548">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2548: Interacting with another robot&#039;s mobile goal (Q&amp;A 2026 clarification)
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        8889A
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        17-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/G16"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        G16
                    </a>&nbsp;
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/SG6"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        SG6
                    </a>&nbsp;
                            </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2547">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2547: G16 Clarification with negative corner
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        Nathan Blair (Event Partner)
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        17-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/G16"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        G16
                    </a>&nbsp;
                            </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/2544">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                2544: SG7 &amp; SC8: Forcing Loss of AWP
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        Bernadine Daichendt
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        16-Feb-2025
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                        <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/SC8"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        SC8
                    </a>&nbsp;
                                    <a href="https://www.robotevents.com/V5RC/2024-2025/QA/tag/SG7"
                       class="badge bg-secondary">
                        <i class="fa fa-fw fa-tag"></i>
                        SG7
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
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=2">2</a></li>
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=3">3</a></li>
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=4">4</a></li>
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=5">5</a></li>
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=6">6</a></li>
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=7">7</a></li>
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=8">8</a></li>
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=9">9</a></li>
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=10">10</a></li>
                                                                                        
                                    <li class="page-item disabled" aria-disabled="true"><span class="page-link">...</span>
                    </li>
                
                
                                            
                
                
                                                                                        <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=16">16</a></li>
                                                                                                <li class="page-item"><a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=17">17</a></li>
                                                                        
            
                            <li class="page-item">
                    <a class="page-link" href="https://www.robotevents.com/V5RC/2024-2025/QA?page=2" rel="next"
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
                Email: <a href="/cdn-cgi/l/email-protection#3f4c4a4f4f504d4b7f4d505d504b5a495a514b4c115c5052"><span class="__cf_email__" data-cfemail="c8bbbdb8b8a7babc88baa7aaa7bcadbeada6bcbbe6aba7a5">[email&#160;protected]</span></a>
            </span>
            </div>
            <div class="col">
                <small>&copy; 2025 Robotics Education &amp; Competition Foundation.</small><br>
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
            api: "https://www.robotevents.com"
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
`,
} satisfies ScrapedPage<QnaHomeUrl>;
