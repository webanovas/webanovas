## המטרה
לחבר את 6 האתרים שבנית לכרטיסים בסקשן `#work` בעמוד הבית, עם כפתור "View Live Site" שנפתח בטאב חדש. הכרטיסים שעוד לא קיבלו URL יציגו תג "Coming Soon" אוטומטית.

## מה נשנה (קובץ אחד עיקרי: `src/pages/Index.tsx`)

### 1. הוספת שדה `liveUrl` למבנה הפרויקטים
לכל אחד מ-6 הפרויקטים נוסיף שדה אופציונלי `liveUrl?: string` עם ה-Lovable subdomain שלו:
```text
yoga       → https://<your-yoga-site>.lovable.app
estates    → https://<...>.lovable.app
nexus      → https://<...>.lovable.app
artist     → https://<...>.lovable.app
restaurant → https://<...>.lovable.app
fashion    → https://<...>.lovable.app
```
תוכל למלא את ה-URLs בעצמך ב-config אחד בראש הקובץ — או לתת לי אותם בהודעה הבאה ואכניס אותם.

### 2. כפתור "View Live Site" בכל כרטיס
מתחת לתיאור של כל פרויקט יופיע כפתור:
- **אם יש `liveUrl`**: כפתור פעיל `View Live Site` עם אייקון `ExternalLink`, נפתח ב-`target="_blank"` עם `rel="noopener noreferrer"`
- **אם אין `liveUrl`**: תג עדין `Coming Soon / בקרוב` במקום הכפתור (לא לחיץ, סגנון muted)

### 3. תרגומים
נוסיף ל-`src/i18n/translations.ts`:
- `he`: "צפו באתר", "בקרוב"
- `en`: "View Live Site", "Coming Soon"
- `es`: "Ver sitio", "Próximamente"

### 4. שמירה על העיצוב הקיים
- עיגולים, צבע, animation ו-rtl-flip באייקון יישארו עקביים עם שאר הכפתורים באתר
- הכפתור משתמש ב-`Button` variant `outline` עם הסטייל הקיים בכרטיסים

## מה לא נשנה
- מבנה הסקשן, הזיג-זג, ה-blobs והאנימציות נשארים זהים
- כפתור "View project" הקיים (עם `p.href`) — אם הוא לא בשימוש נוריד אותו, אם הוא בשימוש למקרה בוחן (Yoga → `/work`) הוא יישאר לצד הכפתור החדש

## אחרי האישור
1. אשנה את הקוד עם 6 placeholder URLs (`#`) + תג "בקרוב" לכולם
2. תיתן לי את 6 ה-Lovable subdomains ואכניס אותם — או תערוך בעצמך config אחד בראש `Index.tsx`