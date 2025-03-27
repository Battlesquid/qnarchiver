import type { ScrapedPage } from "../../src/modules/extractors";
import type { QnaIdUrl } from "../../src/modules/parsing";

export default {
	url: "https://www.robotevents.com/V5RC/2023-2024/QA/1591",
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
                        The position of triballs in Match Load Zone : Robot Events
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
            
                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA"
                   class="btn btn-sm btn-default">
                    <i class="fa fa-arrow-left"></i>
                    All Questions
                </a>
                    </div>
        </div>
    
        <div id="faq">
                <div class="card mb-3 " >
        
                            <div class="card-body">
                    <div class="question">
                <h4>
                    The position of triballs in Match Load Zone
                </h4>
                <hr>
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        14316A
                    </div>
    
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        18-Jul-2023
                    </div>
                </div>
    
                <div class="content-body">
                    <p>&lt;SG1&gt;Note: The Triballs which start in each Match Load Zone must be contacting the Match Load Zone at the start of the Match. However, they may be repositioned during pre-Match setup by the Team whose Robot is using the Starting Tiles adjacent to that Match Load Zone. For example, in Figure 26, Red Robot 1 would be permitted to reposition the Triball in the lower-left red Match Load Zone.</p>
    <p>Is it legal to place the triball  which starts in the Match Load Zone  as in the photo?<img src="https://www.robotevents.com/storage/markdown/uploads/Pu8m8Cs61xtCGS8KiM1apCMS6htuSKODEX03qyzK.jpg" alt="img" /></p>
    
    
                </div>
    
                <div class="tags">
                                        <a href="https://www.robotevents.com/V5RC/2023-2024/QA/tag/SG1" class="badge bg-secondary">
                            <i class="fa fa-fw fa-tag"></i>
                            SG1
                        </a>&nbsp;
                                </div>
    
                                <div class="answer approved">
                        <div class="details">
                            <div class="title">
                                <i class="fa fa-fw fa-check-circle"></i>
                                Answered by committee
                            </div>
    
                                                        <div class="timestamp pull-right">
                                    <i class="fa fa-calendar fa-fw"></i>
                                    24-Jul-2023
                                </div>
                                                </div>
    
                        <div class="content-body">
                            <p>The Match Load Zone is defined as &quot;The portion of the floor tile bordered by a Match Load Bar and an inside corner of the Field Perimeter.&quot; The example you provided--and any other position that meets the requirement of the note in <a href="https://www.robotevents.com/storage/game_manual/VRC_2023-2024_Over_Under/rules/SG1.html">&lt;SG1&gt;</a> (contacting the Match Load Zone)--is legal for a Triball that begins the Match within a Match Load Zone.</p>
    
    
                        </div>
                    </div>
                        </div>
                </div>
                
        
        </div>
    
        
        
        
        
        <div class="modal fade" id="confirmDelete" role="dialog" aria-labelledby="confirmDeleteLabel" aria-hidden="true" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Delete ?
                        <button type="button" class="close btn-close pull-right" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
                    </h4>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="confirm"><span class="glyphicon glyphicon-trash"></span> Delete</button>
                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Cancel</button>
                </div>
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
                    Email: <a href="/cdn-cgi/l/email-protection#b3c0c6c3c3dcc1c7f3c1dcd1dcc7d6c5d6ddc7c09dd0dcde"><span class="__cf_email__" data-cfemail="5f2c2a2f2f302d2b1f2d303d302b3a293a312b2c713c3032">[email&#160;protected]</span></a>
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
                    <link rel="preload" as="style" href="https://www.robotevents.com/build/assets/easymde.min-8d409b2a.css" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/editor-4f9380e2.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_commonjsHelpers-de833af9.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/easymde-f3f45fb2.js" /><link rel="modulepreload" href="https://www.robotevents.com/build/assets/_commonjs-dynamic-modules-302442b1.js" /><link rel="stylesheet" href="https://www.robotevents.com/build/assets/easymde.min-8d409b2a.css" /><script type="module" src="https://www.robotevents.com/build/assets/editor-4f9380e2.js"></script>    <script type="module">
          $(function() {
            $('#confirmDelete').on('show.bs.modal', function(e) {
              var $message = $(e.relatedTarget).attr('data-bs-message');
              if (!$message) {
                $message = $(e.relatedTarget).attr('data-message');
              }
              $(this).find('.modal-body p').html($message);
    
              var $title = $(e.relatedTarget).attr('data-bs-title');
              if (!$title) {
                $title = $(e.relatedTarget).attr('data-title');
              }
              $(this).find('.modal-title').html($title);
    
              // Pass form reference to modal for submission on yes/ok
              var form = null;
              if (e.relatedTarget.dataset['form'] !== undefined) {
                form = $(e.relatedTarget.dataset['form']);
              } else {
                form = $(e.relatedTarget).closest('form');
              }
    
              $(this).find('.modal-footer #confirm').data('form', form);
            });
    
            $('#confirmDelete').find('.modal-footer #confirm').on('click', function() {
              $(this).data('form').submit();
            });
    
            $('button[data-bs-dismiss]').each(function() {
              $(this).attr('data-dismiss', 'modal');
            });
          });
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
} satisfies ScrapedPage<QnaIdUrl>;
