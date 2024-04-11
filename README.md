<div align="center" style="background-color: #518b99; padding: 2.5em;">
<img src="src/images/logo_jeja.svg">
<br>

### Jennifer Jakobsson
</div>
<br>

# Programmering i TypeScript
### Moment 2, DT208G

<br>
<br>
<br>

# Objektorienterad programmering

>### Laboration i moment 2:
>I denna lab har jag börjat med att skapa ett interface med namnet "Todo". Denna inkluderar tre egenskaper - "task" (sträng som representerar själva uppgiften), "completed" (en boolesk variabel som berättar om uppgiften är slutförd eller inte) och en "priority" (siffra som visar prioriteringsnivån på uppgiften).
>
>Vidare har jag skapat en klass, "TodoList", med en privat instansvariabel som lagrar en array av Todo-objekt där en konstruktorfunktion körs när en instans skapas samt laddar "todos" från localStorage. Därefter har jag skapat en del metoder som skapar, hämtar och laddar listan:
>
>- "addTodo" som lägger till nya uppgifter i listan och kollar dess giltighet. Detta returnerar "true" eller "false". 
>- "markTodoCompleted(todoIndex)" som markerar om en uppgiften är slutförd eller inte baserad på dess index.
>- "getTodos" returnerar listan
>- "saveToLocalStorage" där listan sparas i webbläsarens localstorage
>- "loadFromLocalStorage" där listan hämtas från localstorage
>- "clearTodos" som rensar listan
>
>Jag har också skapat en instans av "TodoList" med variabeln "todoList" och hämtat in element som formulär från HTML-dokumentet. Häri finns två händelselyssnare för att hantera inmmatning av ny information till formuläret. Dessa hänvisar till funktionen "handleForm" som tar en parameter för objektet som genererats vid tillägg i formuläret. Därefter har jag hämtat referenser till HTML-elementen "task" och "priority", dess värde och trimmat bort eventuella mellanslag i början eller slutet av inmatningen. 
>
>Vid lyckat inmatning anropas funktionen "renderTodos" och återges med de uppdaterade uppgifterna medan en varning visas med inmatningens krav om den misslyckats.
>
>I "renderTodos" förbereds det för att visa uppdaterade uppgifter genom innerHTML. Jag har sedan använt "todoList.getTodos" för att hämta uppgifterna från instansen och sortera dom bereoende på prioritet. Jag använde också en switch-sats för att tilldela klassnamn för prioriteringarna för att märka dessa på webbplatsen. Därefter skapade jag en input för uppgiftens checkbox och anropade "todoList.markTodoCompleted(index)" för att markera denna och sedan "renderTodos" för att uppdatera ändringarna. 
>
>Till sist adderade jag en knapp som lyssnar efter klick för att sedan rensa hela innehållet.