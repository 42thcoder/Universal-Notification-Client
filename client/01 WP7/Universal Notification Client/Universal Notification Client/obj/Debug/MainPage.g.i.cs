﻿#pragma checksum "d:\users\zyz\documents\visual studio 2010\Projects\Universal Notification Client\Universal Notification Client\MainPage.xaml" "{406ea660-64cf-4c82-b6f0-42d48172a799}" "C89650DDF4826BFACFF8C5F23FCC9A5A"
//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.17929
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

using Microsoft.Phone.Controls;
using System;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Automation.Peers;
using System.Windows.Automation.Provider;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Resources;
using System.Windows.Shapes;
using System.Windows.Threading;
using WP7CordovaClassLib;


namespace Universal_Notification_Client {
    
    
    public partial class MainPage : Microsoft.Phone.Controls.PhoneApplicationPage {
        
        internal System.Windows.Controls.Grid LayoutRoot;
        
        internal WP7CordovaClassLib.CordovaView PGView;
        
        internal System.Windows.Controls.Image SplashImage;
        
        internal System.Windows.Media.PlaneProjection SplashProjector;
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Windows.Application.LoadComponent(this, new System.Uri("/Universal%20Notification%20Client;component/MainPage.xaml", System.UriKind.Relative));
            this.LayoutRoot = ((System.Windows.Controls.Grid)(this.FindName("LayoutRoot")));
            this.PGView = ((WP7CordovaClassLib.CordovaView)(this.FindName("PGView")));
            this.SplashImage = ((System.Windows.Controls.Image)(this.FindName("SplashImage")));
            this.SplashProjector = ((System.Windows.Media.PlaneProjection)(this.FindName("SplashProjector")));
        }
    }
}

