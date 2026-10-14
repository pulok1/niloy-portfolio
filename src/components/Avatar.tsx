import Image from "next/image";
import { profile } from "@/content/profile";
import { isFilled } from "@/lib/placeholder";
import { asset } from "@/lib/site";
import { TodoBadge } from "./Placeholder";
import styles from "./Hero.module.css";

/** Headshot in a hexagonal frame, or an "NB" initials avatar until a photo is added. */
export function Avatar() {
  const photo = profile.photo;
  return (
    <figure className={styles.avatarWrap}>
      <div className={styles.avatarFrame}>
        {isFilled(photo) ? (
          <Image
            src={asset(photo.value)}
            alt={`Portrait of ${profile.name}`}
            width={480}
            height={480}
            priority
            sizes="(min-width: 1024px) 320px, 200px"
            className={styles.avatarImg}
          />
        ) : (
          <span className={styles.initials} role="img" aria-label={`${profile.name} (initials)`}>
            {profile.initials}
          </span>
        )}
      </div>
      {!isFilled(photo) && (
        <figcaption className={styles.avatarTodo}>
          <TodoBadge label={photo.label} title={`Placeholder ${photo.token}: see TODO.md`} />
        </figcaption>
      )}
    </figure>
  );
}
