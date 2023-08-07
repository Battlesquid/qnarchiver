import { ScrapedPage } from "../../modules/extractors";
import { QnaHomeUrl } from "../../modules/parsing";

export default {
    url: "https://www.robotevents.com/judging/2023-2024/QA",
    html: `<!DOCTYPE html>
<html lang="en">
<head class="h-100">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="uap2eHcynMZ4GSkkCaKPPSibtpIM7CAKc3Sd34mI">
        <title>
                    Q&amp;A: Judging : Robot Events
            </title>
    <script>
        window._sentry = {
            init: {
                dsn: "https://f54cedb33b944c03a4832bafb1b33824@sentry.io/1763120",
                environment: "production",
                release: "24222e4",
            }
        };
        </script>

    <script src="/assets/js/manifest.js?id=bdac9ec1151776826d74bd12acda4f9b"></script>
    <script src="/assets/js/vendor.js?id=ac55d9c932c664a80cb324cbfb5460e1"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/assets/css/app.css?id=538be7659bc7c83a962a4c9032e83c65">
    <style>
        body:before {background:url("/images/bg/bg2.svg") repeat;display:block;content:"";position:absolute;z-index:-1;top:165px;left:0;right:0;height:80%;opacity:0.75}
    </style>

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

<script>(window.BOOMR_mq=window.BOOMR_mq||[]).push(["addVar",{"rua.upush":"false","rua.cpush":"false","rua.upre":"false","rua.cpre":"false","rua.uprl":"false","rua.cprl":"false","rua.cprf":"false","rua.trans":"","rua.cook":"false","rua.ims":"false","rua.ufprl":"false","rua.cfprl":"false","rua.isuxp":"false","rua.texp":"norulematch"}]);</script>
                              <script>!function(a){var e="https://s.go-mpulse.net/boomerang/",t="addEventListener";if("False"=="True")a.BOOMR_config=a.BOOMR_config||{},a.BOOMR_config.PageParams=a.BOOMR_config.PageParams||{},a.BOOMR_config.PageParams.pci=!0,e="https://s2.go-mpulse.net/boomerang/";if(window.BOOMR_API_key="28XQ5-GM8SS-4QJRU-YYRQX-UPV5E",function(){function n(e){a.BOOMR_onload=e&&e.timeStamp||(new Date).getTime()}if(!a.BOOMR||!a.BOOMR.version&&!a.BOOMR.snippetExecuted){a.BOOMR=a.BOOMR||{},a.BOOMR.snippetExecuted=!0;var i,_,o,r=document.createElement("iframe");if(a[t])a[t]("load",n,!1);else if(a.attachEvent)a.attachEvent("onload",n);r.src="javascript:void(0)",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="width:0;height:0;border:0;display:none;",o=document.getElementsByTagName("script")[0],o.parentNode.insertBefore(r,o);try{_=r.contentWindow.document}catch(O){i=document.domain,r.src="javascript:var d=document.open();d.domain='"+i+"';void(0);",_=r.contentWindow.document}_.open()._l=function(){var a=this.createElement("script");if(i)this.domain=i;a.id="boomr-if-as",a.src=e+"28XQ5-GM8SS-4QJRU-YYRQX-UPV5E",BOOMR_lstart=(new Date).getTime(),this.body.appendChild(a)},_.write("<bo"+'dy onload="document._l();">'),_.close()}}(),"".length>0)if(a&&"performance"in a&&a.performance&&"function"==typeof a.performance.setResourceTimingBufferSize)a.performance.setResourceTimingBufferSize();!function(){if(BOOMR=a.BOOMR||{},BOOMR.plugins=BOOMR.plugins||{},!BOOMR.plugins.AK){var e=""=="true"?1:0,t="",n="i2xxyydimrksszgrhevq-f-956a96596-clientnsv4-s.akamaihd.net",i="false"=="true"?2:1,_={"ak.v":"36","ak.cp":"1394132","ak.ai":parseInt("221764",10),"ak.ol":"0","ak.cr":36,"ak.ipv":4,"ak.proto":"h2","ak.rid":"38c5f687","ak.r":45796,"ak.a2":e,"ak.m":"a","ak.n":"essl","ak.bpcip":"70.175.124.0","ak.cport":50688,"ak.gh":"23.213.244.104","ak.quicv":"","ak.tlsv":"tls1.3","ak.0rtt":"","ak.csrc":"-","ak.acc":"","ak.t":"1691433259","ak.ak":"hOBiQwZUYzCg5VSAfCLimQ==aCpFPO4A+Q0pZWi+N/BcqII25weldwHr8FUm7HUxdWLSLHiMkXizrK4K7ZiMn3t76E8jF/ZCO7sHWejVBBjqq2kGDAHvPTbFX0hL6zTF800ivddmnA9ga+pVf3ssucdwtlWhpw43y79CZBQ3T8Ij5Xn4c7h7ZUjhPQ0hhozWK+AjnituBr/WzsQQravfp55PRut/ChKUUq6EG9Rk4oTEUDjBiVrjUc/7ukyE9sB0CMxWBLy3JqG9LVDCtRk5prwXxtLghTPjkJT1gVcZPjK2QB4CrTpad3+cE/XB5ytde+90NFwKQIlCw6VUJqMOlqWqu7uoeeXdGXAXsxCudfUDc15d0y+mJuo3XX3qTgCScnMGFO6KQ0vgLh6y9rq7o6V8wrr+FZUPnR8L+Wgr5cxBedNCiqd08bBNnvzLLMi8PiI=","ak.pv":"322","ak.dpoabenc":"","ak.tf":i};if(""!==t)_["ak.ruds"]=t;var o={i:!1,av:function(e){var t="http.initiator";if(e&&(!e[t]||"spa_hard"===e[t]))_["ak.feo"]=void 0!==a.aFeoApplied?1:0,BOOMR.addVar(_)},rv:function(){var a=["ak.bpcip","ak.cport","ak.cr","ak.csrc","ak.gh","ak.ipv","ak.m","ak.n","ak.ol","ak.proto","ak.quicv","ak.tlsv","ak.0rtt","ak.r","ak.acc","ak.t","ak.tf"];BOOMR.removeVar(a)}};BOOMR.plugins.AK={akVars:_,akDNSPreFetchDomain:n,init:function(){if(!o.i){var a=BOOMR.subscribe;a("before_beacon",o.av,null,null),a("onbeacon",o.rv,null,null),o.i=!0}return this},is_complete:function(){return!0}}}}()}(window);</script><script >bazadebezolkohpepadr="1137576546"</script><script type="text/javascript" src="https://www.robotevents.com/akam/13/43ce0b9f"  defer></script></head>
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
            <a href="http://www.roboticseducation.org/">
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
        VEX Robotics Competition
    </a>
</li>
                                                    <li>
    <a href="https://www.robotevents.com/robot-competitions/college-competition" class="dropdown-item">
        VEX U
    </a>
</li>
                                                    <li>
    <a href="https://www.robotevents.com/robot-competitions/vex-ai-competition" class="dropdown-item">
        VEX AI Competition
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
                                                    <li>
    <a href="https://www.robotevents.com/robot-competitions/bell-advanced-vertical-robotics-competition" class="dropdown-item">
        Bell Advanced Vertical Robotics Competition
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
    <a href="http://www.roboticseducation.org/contact-us/contact-info/" class="dropdown-item">
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
                            Judging
                    </h1>

        <div>
                    <a href="https://www.robotevents.com/judging/2023-2024/QA/guidelines"
               class="btn btn-primary btn-sm">
                Usage Guidelines
            </a>
        
                </div>
    </div>

    <div id="faq">
            
    <p>Welcome to the official REC Foundation Question &amp; Answer system for Judging. All registered teams can ask for official Judging interpretations and clarifications. This Q&amp;A is the only source for official Judging clarifications, and the clarifications made here by the REC Foundation Competition Judging Committee (CJC) are considered as official and binding as the written <a href="https://www.roboticseducation.org/documents/2019/08/judge-guide.pdf/">Guide to Judging</a>.</p>
<ul>
<li>Please review the <a href="/judging/2019-2020/QA/guidelines">Judging Q&amp;A Usage Guidelines</a> before posting. This Q&amp;A is only intended for specific Judging questions for the VEX IQ Challenge, VEX Robotics Competition, and VEX U Competition.</li>
<li>Please review the current season <a href="https://www.roboticseducation.org/documents/2019/08/judge-guide.pdf/">Guide to Judging</a> before posting.</li>
<li>For event, registration, or other competition support questions, please contact your REC Foundation Regional Support Manager.</li>
<li>For questions related to game rules and interpretations, please navigate to the Official Game Q&amp;A (<a href="https://www.robotevents.com/VRC/2023-2024/QA">VRC </a>/ <a href="https://www.robotevents.com/VIQC/2023-2024/QA">IQ</a>) . Click the back button in your browser, then click the VEX Q&amp;A Forum button.</li>
</ul>



    <div class="row">
        <div class="col-sm-4">
            <form method="GET" action="https://www.robotevents.com/judging/2023-2024/QA" accept-charset="UTF-8">
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
                        <a href="https://www.robotevents.com/faqs/9/pdf">
                            All Questions
                        </a>
                    </li>
                    <li class="dropdown-item">
                        <a href="https://www.robotevents.com/faqs/9/pdf?important=1">
                            Starred Questions
                        </a>
                    </li>
                </ul>
            </div>
                            <a href="https://www.robotevents.com/judging/2023-2024/QA/ask"
                   class="btn btn-default">
                    <i class="fa fa-fw fa-edit"></i>
                    Ask a Question
                </a>
                    </div>
    </div>

            <hr>
                            <a href="https://www.robotevents.com/judging/2023-2024/QA?filter=new_question"
                   class="btn btn-danger" style="margin-bottom: 1em">
                <i class="fa fa-filter"></i>

                New Questions

                <span class="badge badge-secondary">5</span>
            </a>
                    <a href="https://www.robotevents.com/judging/2023-2024/QA?filter=new_answer"
                   class="btn btn-danger" style="margin-bottom: 1em">
                <i class="fa fa-filter"></i>

                New Answers

                <span class="badge badge-secondary">4</span>
            </a>
            
    <br>
    
    <div class="card mb-3 " >
    
                        <div class="card-body">
                <h4 class="title">
                                    <a href="https://www.robotevents.com/judging/2023-2024/QA/1592">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                Guidelines when Judging Single-Student Teams
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        Dale Nacianceno (Event Partner)
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        19-Jul-2023
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/judging/2023-2024/QA/1564">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                Excellence Eligibility criteria
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
                        20-Jun-2023
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/judging/2023-2024/QA/1562">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                Optional Materials During Interview
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        Dale Nacianceno (Event Partner)
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        20-Jun-2023
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                </div>
                                                <hr>
                        <h4 class="title">
                                    <a href="https://www.robotevents.com/judging/2023-2024/QA/1556">
                                                    <span class="is_answered"><i class="fa fa-check-circle"></i></span>
                                                Excellence Award Minimum Criteria within VEXU and small blended Tournaments
                    </a>
                
                            </h4>

            <div class="question">
                <div class="details">
                    <div class="author">
                        <i class="fa fa-fw fa-group"></i>
                        Jacob Church (Event Partner)
                    </div>
                    <div class="timestamp">
                        <i class="fa fa-fw fa-calendar"></i>
                        16-Jun-2023
                    </div>
                </div>

                            </div>

            <div class="tags clearfix">
                                                                            <span class="badge bg-danger me-2">New Question</span>
                                                                <span class="badge bg-success me-2">New Answer</span>
                                                                </div>
                    
        <div class="mt-3 d-flex justify-content-center">
            
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
                Email: <a href="mailto:support@robotevents.com">support@robotevents.com</a>
            </span>
            </div>
            <div class="col">
                <small>&copy; 2023 Robotics Education &amp; Competition Foundation.</small><br>
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

    <script>
        window.ApiUrl = {
            api: "https://www.robotevents.com",
            wss: "sub.robotevents.com"
        };
    </script>
    <script src="/assets/js/app.js?id=ae709dc2b11363240880afe8da2bc4d9"></script>
            <script src="/js/faqs.js?id=197b2a50fcada702ec852efd94c599c1"></script>
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

    <noscript><img src="https://www.robotevents.com/akam/13/pixel_43ce0b9f?a=dD0wYzY2M2U1NmM2NTFmNjYzMGM1MzUzMzgxM2RmNmRkOWVkOTNjYjBmJmpzPW9mZg==" style="visibility: hidden; position: absolute; left: -999px; top: -999px;" /></noscript></body>
</html>
`
} satisfies ScrapedPage<QnaHomeUrl>;
