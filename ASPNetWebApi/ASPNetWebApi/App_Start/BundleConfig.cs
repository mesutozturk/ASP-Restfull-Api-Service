using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace ASPNetWebApi.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = true;
            bundles.Add(new ScriptBundle("~/bundle/jquery").Include(
                "~/Scripts/jquery-3.1.1.js",
                "~/Scripts/bootstrap.js"
                ));
            bundles.Add(new ScriptBundle("~/bundle/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/app.js"
                ));
            bundles.Add(new StyleBundle("~/bundle/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/bootstrap-theme.css",
                "~/Content/site.css"
                ));
        }
    }
}