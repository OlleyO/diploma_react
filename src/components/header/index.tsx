import React, { useEffect } from "react";
import { toPicture } from "@/helpers";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { supabase } from "@/api";

export const Header: React.FC = () => {
  const allRef = React.useRef();
  const phonesRef = React.useRef();
  const laptopsRef = React.useRef();
  const accessoriesRef = React.useRef();

  const refs = {
    all: allRef,
    phones: phonesRef,
    laptops: laptopsRef,
    accessories: accessoriesRef,
  };

  useEffect(() => {
    document.addEventListener("navigate", handleNavigateEvent);
    return () => {
      document.removeEventListener("navigate", handleNavigateEvent);
    };
  }, []);

  function handleNavigateEvent(e: CustomEvent) {
    if (e.type === "navigate") {
      refs[e.detail.to]?.current?.click();
    }
  }

  return (
    <header className={styles.headerContainer}>
      <img src={toPicture("")} alt="" />
      <nav>
        <ul>
          <li>
            <Link ref={allRef} to="/items/all">
              All
            </Link>
          </li>
          <li>
            <Link ref={phonesRef} to="/items/smartphones">
              Phones
            </Link>
          </li>
          <li>
            <Link ref={laptopsRef} to="/items/laptops">
              Laptops
            </Link>
          </li>
          <li>
            <Link ref={accessoriesRef} to="/items/accessories">
              Accessories
            </Link>
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
