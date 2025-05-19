import { Pin } from "lucide-react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command.js";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  type LatLng,
} from "use-places-autocomplete";
import { useJsApiLoader } from "@react-google-maps/api";

type Props = {
  onChange?: (value: LatLng) => void;
};
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const maplibraries = ["places"] as any;

export default function MapPicker(props: Props) {
  const { isLoaded } = useJsApiLoader({
    libraries: maplibraries,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY!,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Picker {...props} />;
}

function Picker({ onChange }: Props) {
  const { value, suggestions, setValue } = usePlacesAutocomplete();
  const [hidden, setHidden] = useState(true);

  return (
    <Command
      onChange={() => {
        console.log("Changed");
      }}
      shouldFilter={false}
      className="rounded-[8px] border border-[#D0D5DD] lg:w-[550px] "
    >
      <CommandInput
        value={value}
        onValueChange={(e) => {
          setValue(e);
          setHidden(false);
        }}
        placeholder={"Type a location to search..."}
      />
      <CommandList hidden={hidden}>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {suggestions.data.map((suggestion) => (
            <CommandItem
              onSelect={() => {
                setValue(suggestion.description, false);
                onChange &&
                  getGeocode({ placeId: suggestion.place_id }).then((e) => {
                    // biome-ignore lint/style/noNonNullAssertion: <explanation>
                    onChange(getLatLng(e[0]!));
                    // biome-ignore lint/style/noNonNullAssertion: <explanation>
                    console.log("Changed to ", getLatLng(e[0]!));
                  });

                setHidden(true);
              }}
              key={suggestion.place_id}
              value={suggestion.place_id}
            >
              <Pin className="mr-2 size-4" />
              <span>{suggestion.description}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
