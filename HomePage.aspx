<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HomePage.aspx.cs" Inherits="Portfolio.HomePage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>
        body {
            position: relative;
        }
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js" integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF" crossorigin="anonymous"></script>
    <link href="scripts/homeStyles.css" rel="stylesheet" />
    <link href="scripts/StyleSheet1.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css">
    <script>
        $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').trigger('focus')
        });
    </script>
</head>
<body data-spy="scroll" data-target=".navbar">

    <form id="form1" runat="server">
        <div class="container-fluid" style="background: whitesmoke;">
            <nav id="navbar-example2" class="navbar fixed-top navbar-light navColor">
                <a class="navbar-brand" href="HomePage.aspx">
                    <img src="Images/icon.png" class="iconImg" />
                </a>
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link navMenu" href="#profile">My Profile</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link navMenu" href="#portfolio">Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link navMenu" href="#contact">Contact</a>
                    </li>
                </ul>
            </nav>

            <div class="container-fluid home" id="home">
                <div class="row">
                    <img src="Images/11.jpg" class="w-100 myImg" />
                    <div class="title">
                        <label class="txtStyleTitle">I'm Bhavik</label>
                        <label class="txtStyle">Web Designer and Developer</label>
                    </div>

                </div>

            </div>
            <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
                <div class="section MyProfile" id="profile">
                    <div class="container cPro ">
                        <div class="pro1 ">
                            <hr class="hLine" />
                            <div class="row">
                                <h1 class="profileHeader">About me</h1>
                            </div>
                            <div class="row">
                                <h5 class="profileContent">
                                    <p>
                                        I am a Passionate Web Designer and Developer, I always try to create web pages with code behind it to make myself go beyond my comfort zone. Pursuing Passion in professional life is all about the first step of success that is the only motto of my work.
                                         Being a beginner in this huge IT world I am searching for knowledge and on the way to convert it into practice.
                                    </p>
                                </h5>
                            </div>
                            <hr class="hLine" />
                        </div>

                        <div class="pro2" style="margin-top: 2%;">
                            <div class="row">
                                <h1 class="profileHeader2">Education and Experience</h1>
                            </div>
                            <div class="row">
                                <div class="timeline">
                                    <div class="timeline-row">
                                        <div class="timeline-time">
                                            Jan-2019 to May-2019<small>6 Months</small>
                                        </div>
                                        <div class="timeline-dot fb-bg"></div>

                                        <div class="timeline-content">

                                            <i class="fa fa-map-marker"></i>
                                            <h4>WEB DEVELOPER AT KNOVOS INDIA<br />
                                                PVT LTD.<br />
                                                (GANDHINAGAR)</h4>
                                            <p>
                                                Trainee as web developer in 6th semester project “Document Assessment
                                            System”. A Group member among 8 others working on this product and having
                                            responsibility to do Review Module from project to show the client's
                                            requirements.
                                            </p>

                                        </div>
                                    </div>
                                    <div class="timeline-row">
                                        <div class="timeline-time">
                                            May-2019
                                        </div>
                                        <div class="timeline-dot fb-bg"></div>
                                        <div class="timeline-content">
                                            <i class="fa fa-map-marker"></i>
                                            <h4>MASTER OF COMPUTER APPLICATIONS!</h4>
                                            <p>Completed from same university from Gujarat,India.</p>
                                            <h6>Had experience of working in two web applications in two diffrent technologies.</h6>
                                        </div>
                                    </div>
                                    <div class="timeline-row">
                                        <div class="timeline-time">
                                            April-2016
                                        </div>
                                        <div class="timeline-dot green-one-bg"></div>
                                        <div class="timeline-content green-one">
                                            <i class="fa fa-warning"></i>
                                            <h4>BACHELOR OF COMPUTER APPLICATIONS!</h4>
                                            <p>Reached first step towards the it world with having great knowledge and skills.</p>
                                        </div>
                                    </div>
                                    <div class="timeline-row">
                                        <div class="timeline-time">
                                            April-2013
                                        </div>
                                        <div class="timeline-dot green-two-bg"></div>
                                        <div class="timeline-content green-two">
                                            <i class="fa fa-list"></i>
                                            <h4>HIGHER SECONDARY ( Class 12)</h4>
                                            <p>Completed Class 12 from pioneer high school which is located in Center place of gujarat (ANAND).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="pro3" style="margin-top: 2%;">
                            <hr class="hLine" />
                            <div class="row" style="margin-top: 2%;">
                                <h1 class="profileHeader">Skills</h1>
                            </div>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <button type="button" style="margin-left: 34%;" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Intermediate">
                                            C#
                                        </button>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Intermediate">
                                            PHP
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Intermediate">
                                            Asp.net
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Intermediate">
                                            HTML5
                                        </button>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" style="margin-right: -26%;" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Intermediate">
                                            CSS3
                                        </button>
                                    </div>
                                </div>
                                <div class="row" style="margin-top: 1%;">
                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Intermediate" style="margin-left: 34%;">
                                            Bootstrap
                                        </button>
                                    </div>

                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Intermediate">
                                            C (Programming Language)
                                        </button>
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Beginner">
                                            Javascript
                                        </button>
                                    </div>
                                </div>
                                <div class="row" style="margin-top: 1%;">
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" style="margin-left: 34%;" title="Intermediate">
                                            Jquery
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Beginner">
                                            AJAX
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Advanced">
                                            MS-Office
                                        </button>
                                    </div>
                                    <div class="col-md-3">
                                        <button type="button" class="btn btn-secondary skillBtn" data-toggle="tooltip" data-placement="top" title="Intermediate">
                                            MySql
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <hr class="hLine" style="margin-top: 2%;" />
                        </div>

                    </div>
                </div>

                <div class="section portFolio" id="portfolio" style="margin-top: 2%;">
                    <div class="container">
                        <div class="row">
                            <h1 class="profileHeader" style="margin-left: 22%;">Some of the examples are</h1>
                        </div>
                        <div class="row">
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner myCar">
                                    <div class="carousel-item active">
                                        <img src="ScreenShots/2.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">

                                        <img src="ScreenShots/register.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                    <div class="carousel-item">
                                        <img src="ScreenShots/14.jpg" class="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>

                        <hr class="hLine" style="margin-top: 3%;" />
                    </div>
                    <div class="container">
                        <div class="row">
                            <h1 class="profileHeader" style="margin-left: 30%;">More Designs by Me..</h1>
                        </div>
                        <div class="row">

                            <div class="col-md-6">
                                <img src="ScreenShots/13.jpg" class="d-block w-100 imgDesign" alt="..." />
                            </div>
                            <div class="col-md-6">
                                <img src="ScreenShots/12.jpg" class="d-block w-100 imgDesign" alt="..." />
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md-6">
                                <img src="ScreenShots/11.jpg" class="d-block w-100 imgDesign" alt="..." />
                            </div>
                            <div class="col-md-6">
                                <img src="ScreenShots/17.jpg" class="d-block w-100 imgDesign" alt="..." />
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md-6">
                                <img src="ScreenShots/15.jpg" class="d-block w-100 imgDesign" alt="..." />
                            </div>
                            <div class="col-md-6">
                                <img src="ScreenShots/16.jpg" class="d-block w-100 imgDesign" alt="..." />
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-md-6">
                                <img src="ScreenShots/18.jpg" class="d-block w-100 imgDesign" alt="..." />
                            </div>
                            <div class="col-md-6">
                                <img src="ScreenShots/19.jpg" class="d-block w-100 imgDesign" alt="..." />
                            </div>
                        </div>
                        <hr class="hLine" style="margin-top: 2%;" />
                    </div>
                </div>

                <div class="section" id="contact" style="margin-top: 2%;">
                    <div class="container-fluid" style="margin-left: -1%;">
                        <div class="row">
                            <h1 class="profileHeader" style="margin-left: 18%;">Lets find out where we can contact</h1>
                        </div>
                        <div class="row">
                            <div class="mapouter">
                                <div class="gmap_canvas">
                                    <iframe width="1490" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=rajpath%20marg,vallabh%20vidhyanagar&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                    <a href="https://123movies-to.org"></a>
                                    <br />
                                    <style>
                                        .mapouter {
                                            position: relative;
                                            text-align: right;
                                            height: 400px;
                                            width: 1490px;
                                        }
                                    </style>
                                    <a href="https://www.embedgooglemap.net">embedgooglemap.net</a><style>
                                                                                                       .gmap_canvas {
                                                                                                           overflow: hidden;
                                                                                                           background: none !important;
                                                                                                           height: 400px;
                                                                                                           width: 1490px;
                                                                                                       }
                                                                                                   </style>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="width: 104%;">
                            <div class="col-md-3 col1Color">

                                <i class="far fa-hand-point-right movHand"></i>
                            </div>
                            <div class="col-md-3 col2Color">

                                <div class="footerCols">
                                    <h3><i class="far fa-address-card "></i></h3>
                                    <h3>MILK CITY</h3>
                                    <br />
                                    <h5>45, Ambika Society, Vallabh Vidhyanagar</h5>
                                    <h6>Anand-388120</h6>
                                </div>

                            </div>
                            <div class="col-md-3 col3Color">
                                <div class="footerCols">
                                    <h3><i class="far fa-thumbs-up"></i></h3>
                                    <h3>SOCIAL</h3>
                                    <br />
                                    <div class="row">
                                        <div class="col-md-3">
                                            <h2>
                                                <a href="https://twitter.com/BhavikP94" style="color: deepskyblue;"><i class="fab fa-twitter"></i></a>
                                            </h2>
                                        </div>
                                        <div class="col-md-3">
                                            <h2>
                                                <a href="https://www.facebook.com/MR.BMPatel/" style="color: lightsteelblue;"><i class="fab fa-facebook"></i></a>
                                            </h2>
                                        </div>
                                        <div class="col-md-3">
                                            <h2>
                                                <a href="https://github.com/bhavik1094" style="color: black;"><i class="fab fa-github-alt"></i></a>
                                            </h2>
                                        </div>
                                        <div class="col-md-3">
                                            <h2>
                                                <a href="https://instagram.com/bhavumpatel94?igshid=2e0ajqja4y32" style="color: darkred;"><i class="fab fa-instagram"></i></a>
                                            </h2>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-3 col4Color">
                                <div class="footerCols">
                                    <h3><i class="fas fa-phone-volume"></i></h3>
                                    <h3>CALL - EMAIL</h3>
                                    <br />
                                    <h5>+91 8849 143526</h5>
                                    <h5>bmpatel1994@gmail.com</h5>
                                </div>
                            </div>
                        </div>
                        <div class="row footerColor" style="width: 104%;">
                            <h6>@2019 Copyrights. All Rights Reserved</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </form>
</body>
</html>
