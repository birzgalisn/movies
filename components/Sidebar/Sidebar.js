import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
  HiFilm,
  HiOutlineHome,
  HiOutlineLogin,
  HiOutlineSparkles,
} from "react-icons/hi";
import Select from "react-select";
import shallow from "zustand/shallow";
import { useStore } from "../../app/store";
import LoadingDots from "../LoadingDots";
import SidebarLink from "../SidebarLink";
import styles from "./Sidebar.module.scss";

const fetchEvent = async () => {
  const data = await fetch("/api/imfeelinglucky").then((res) => res.json());
  return data;
};

export default function Sidebar() {
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [selectedGenres, setSelectedGenres] = useStore(
    (state) => [state.selectedGenres, state.setSelectedGenres],
    shallow
  );
  const availableGenres = useStore((state) => state.availableGenres, shallow);
  const router = useRouter();

  const availableOptions = useMemo(
    () => availableGenres.map(({ name }) => ({ label: name, value: name })),
    [availableGenres]
  );

  const handleLoadEvent = async () => {
    setIsLoadingEvent((prev) => !prev);
    const event = await fetchEvent();
    router.push(`/events/${event}`);
  };

  const handleGenreSelectionChange = (event) => {
    if (event.cancelable) {
      event.preventDefault();
    }
    setSelectedGenres(event);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_content}>
        <div className={styles.sidebar_links}>
          <SidebarLink href={"/"} text={"Home"} icon={<HiOutlineHome />} />
          <SidebarLink href={"/events"} text={"Events"} icon={<HiFilm />} />
          <SidebarLink
            href={"/login"}
            text={"Login"}
            icon={<HiOutlineLogin />}
          />
        </div>

        {router.asPath.match(/(\/events)(?!\/)/) && (
          <>
            <div className={styles.sidebar_genres}>
              <div className={styles.sidebar_genres_select}>
                <p>Genres</p>
                <Select
                  instanceId="genre"
                  isMulti={true}
                  isClearable={true}
                  isSearchable={false}
                  options={availableOptions}
                  value={selectedGenres}
                  onChange={handleGenreSelectionChange}
                  placeholder="Select genre..."
                />
              </div>
            </div>

            <div className={styles.sidebar_lucky}>
              <button onClick={handleLoadEvent} disabled={isLoadingEvent}>
                {isLoadingEvent ? <LoadingDots /> : <HiOutlineSparkles />}
                I&apos;m Feeling Lucky
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
