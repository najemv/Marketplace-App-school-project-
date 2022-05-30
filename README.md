# PB138 projekt

## Tým
| UČO    | JMÉNO            |
|--------|------------------|
| 484993 | Dominik Lašo  💀 |
| 485430 | Jakub Košvanec   |
| 485289 | Marek Laššák     |
| 492991 | Vojtěch Nájemník |

## O projektu
### **Bazoš**
Umožňuje zadat uživatelům seznam nabídek/poptávek na bazaru. Každá nabídka/poptávka obsahuje název, popisek, očekávanou cenu a kontakt. Nabídky jsou kategorizovány.


## Setup
<a name="backend"></a>
### Backend
1. Zapněte db container, který má prázdný anebo nekonflitkní obsah s seed-data.yaml

```docker-compose -f compose.yml up -d```

2. Aplikujte existujicí migrace

```npx prisma migrate dev --name *name*```

3. Pusťte seed script

```npm run seed```

Můžete se ve webovém gui podívat, zda je všechno ok

```npx prisma studio```

4. Pokud všechno souhlasí, spusťte db

```npm run start```


<a name="frontend"></a>
### Frontend
1. Nastavte si db pro funkčnost webové aplikace viz [Backend](#backend)


2. Spusťte web

```npm run start```
