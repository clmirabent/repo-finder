import { useState } from "react";

interface SearchBarComponentProp {
    onSearch?: (input: string) => void,
    placeholder: string
}

function SearchBarComponent(prop: SearchBarComponentProp) {
    const [input, setInput] = useState<string>("");

    function onSearch() {
        if (prop.onSearch)
            prop.onSearch(input)
    }

    return <div>
        <input
            type="text"
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder={prop.placeholder}
        />
        <button onClick={onSearch}> Search</button>
    </div>
}

export { SearchBarComponent }