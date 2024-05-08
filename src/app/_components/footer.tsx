import { HiveLink } from "~/components/hive/hive-link";

export const Footer = () => {
  const footerLinks = [
    { title: "About", link: "https://about.twitter.com/" },
    {
      title: "Download the X app",
      link: "https://help.twitter.com/using-x/download-the-x-app",
    },
    { title: "Help Center", link: "https://help.twitter.com/" },
    { title: "Terms of Service", link: "https://twitter.com/tos" },
    { title: "Privacy Policy", link: "https://twitter.com/privacy" },
    {
      title: "Cookie Policy",
      link: "https://support.twitter.com/articles/20170514",
    },
    {
      title: "Accessibility",
      link: "https://help.twitter.com/resources/accessibility",
    },
    {
      title: "Ads Info",
      link: "https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo",
    },
    { title: "Blog", link: "https://blog.twitter.com/" },
    { title: "Status", link: "https://status.twitterstat.us/" },
    { title: "Careers", link: "https://careers.twitter.com/" },
    {
      title: "Brand Resources",
      link: "https://about.twitter.com/press/brand-assets",
    },
    {
      title: "Advertising",
      link: "https://ads.twitter.com/?ref=gl-tw-tw-twitter-advertise",
    },
    { title: "Marketing", link: "https://marketing.twitter.com/" },
    {
      title: "X for Business",
      link: "https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness",
    },
    { title: "Developers", link: "https://developer.twitter.com/" },
    { title: "Directory", link: "https://twitter.com/i/directory/profiles" },
    { title: "Settings", link: "https://twitter.com/settings" },
  ];
  return (
    <footer className=" flex min-h-fit flex-wrap items-center  justify-center gap-2 p-4 py-2 text-accent-foreground">
      {footerLinks.map(({ title, link }) => (
        <HiveLink variant="ghost" key={title} href={link} className="">
          {title}
        </HiveLink>
      ))}
      <HiveLink variant="ghost" href="#" className="">
        © 2023 TweeX Corp.
      </HiveLink>
    </footer>
  );
};
