import React from "react";
import HydraNodeLogo from "@/public/hydranode_logo.png";
import Image from "next/image";
import { FaMedium } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="block-space  border-t-4">
      <div className="grid grid-cols-1 big-container md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src={HydraNodeLogo} alt="" />
          <span>Boost your Competitive Skills and Earn Rewards</span>
          <div>
            <div>
              <FaXTwitter />
            </div>
            <div>
              <FaLinkedin />
            </div>
            <div>
              <FaMedium />
            </div>
          </div>
        </div>
        <div>
          <h5>Company</h5>
          <Link href={"*"}>About Us</Link>
          <Link href={"*"}>Token</Link>
          <Link href={"*"}>Product</Link>
          <Link href={"*"}>Pricing</Link>
        </div>
        <div>
          <h5>Legal</h5>
          <Link href={"*"}>Privacy Policy</Link>
          <Link href={"*"}>Terns of Use</Link>
          <Link href={"*"}>Terms of Service</Link>
        </div>
        <div>
          <h5>Join our Newsletter</h5>
          <Input />
          <Button>Subscribe</Button>
          <span>Will send you weekly updates</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
