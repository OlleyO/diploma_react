import React from "react";
import { toPicture } from "@/helpers";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { supabase } from "@/api";

export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <img src={toPicture("")} alt="" />
      <nav>
        <ul>
          <li>
            <Link to="/items/all">All</Link>
          </li>
          <li>
            <Link to="/items/smartphones">Phones</Link>
          </li>
          <li>
            <Link to="/items/laptops">Laptops</Link>
          </li>
          <li>
            <Link to="/items/accessories">Accessories</Link>
          </li>
          <li>
            <Button
              onClick={() => {
                supabase.auth.signOut();
              }}
            >
              Вийти
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
