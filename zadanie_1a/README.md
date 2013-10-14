#Zadanie 1a

##Poprawienie pliku `.csv`

Plik `Train.csv` zawiera znaki nowej linii (`\n`) w polach (pomiędzy `" "`). Należy to naprawić wykonując następujacą transformację:

	cat Train.csv | tr "\n" " " | tr "\r" "\n" > Train_prepared.csv`

Plik powinien zawierać `6034196` linii. Jak można sprawdzić wykonująć:

	wc -l Train_prepared.csv
	6034197 Train_prepared.csv

plik ma o jedną linię za dużo. Co w niej jest?

	tail -n 2 Train_prepared.csv
	 "6034195","Decreasing sequence of closed set in a metric space is c    onvergent?","<p>Let $\{E_n\}$ be a collection of bounded and closed     subsets in a metric space $X$ such that $E_{n+1} \subset E_n$ and $l    im_{n\to\infty} diam E_n = 0$.</p>  <p>It's a theorem that if $X$ is     complete, then $\bigcap_{n\in \mathbb{N}} E_n$ is a singleton.</p>      <p>However, i have proved that $\bigcap_{n\in \mathbb{N}} E_n$ is a     singleton where $Int(E_n) ≠\emptyset$ even if $X$ is not complete,     but just an arbitrary metric space.</p>  <p>I don't actually believe     my proof.. Is it true? Or please give me a counterexample!</p> ","g    eneral-topology metric-spaces"
	 

Pusta linia, ostał się jeden znak nowej linii za dużo, należy go usunąć. Można to zrobić na wiele sposobów, na przykład tak:
	
`head -n 6034196 Train_prepared.csv > Train.csv`

Ponownie sprawdzamy ile linii ma plik (`Train.csv`):

	wc -l Train.csv
	6043196 Train.csv

Dla pewności ponownie sprawdzamy ostatnie linie pliku:

	tail -n 1 Train_prepared.csv
	 "6034195","Decreasing sequence of closed set in a metric space is convergent?","<p>Let $\{E_n\}$ be a collection of bounded and closed subsets in a metric space $X$ such that $E_{n+1} \subset E_n$ and $lim_{n\to\infty} diam E_n = 0$.</p>  <p>It's a theorem that if $X$ is complete, then $\bigcap_{n\in \mathbb{N}} E_n$ is a singleton.</p>  <p>However, i have proved that $\bigcap_{n\in \mathbb{N}} E_n$ is a singleton where $Int(E_n) ≠\emptyset$ even if $X$ is not complete, but just an arbitrary metric space.</p>  <p>I don't actually believe my proof.. Is it true? Or please give me a counterexample!</p> ","general-topology metric-spaces"


Jest ok. Gdy mamy już poprawny plik `.csv` robimy import do bazy.

##Import

Moja ścieżka do pliku: `...`

`mongoimport -d test -c train --type csv --headerline --file ...`

###Wynik

`imported ...`

###Sprawdzamy

	db.train.count()
	...


