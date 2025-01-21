import { render, screen, within } from "../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import { EpisodeSelector } from "../EpisodeSelector";

describe("EpisodeSelector", () => {
  const mockOnSelectEpisodes = jest.fn();
  const defaultProps = {
    selectedEpisodes: [1, 2],
    onSelectEpisodes: mockOnSelectEpisodes,
    availableEpisodes: [1, 2, 3, 4, 5, 6],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all available episodes", async () => {
    const user = userEvent.setup();
    render(<EpisodeSelector {...defaultProps} />);

    const select = screen.getByRole("combobox", {
      name: /select episodes to compare/i,
    });
    expect(select).toBeInTheDocument();

    // Open the dropdown
    await user.click(select);

    // Now check for all episodes in the dropdown
    defaultProps.availableEpisodes.forEach((episode) => {
      const option = screen.getByRole("option", { name: `Episode ${episode}` });
      expect(option).toBeInTheDocument();
    });
  });

  it("shows selected episodes", async () => {
    const user = userEvent.setup();
    render(<EpisodeSelector {...defaultProps} />);

    const select = screen.getByRole("combobox", {
      name: /select episodes to compare/i,
    });

    // Click to open the dropdown
    await user.click(select);

    // Now we can find the options
    const options = screen.getAllByRole("option");
    const selectedOptions = options.filter(
      (option) => option.getAttribute("aria-selected") === "true"
    );

    expect(selectedOptions).toHaveLength(2);
    expect(selectedOptions[0]).toHaveTextContent("Episode 1");
    expect(selectedOptions[1]).toHaveTextContent("Episode 2");
  });

  it("handles episode selection", async () => {
    const user = userEvent.setup();
    render(<EpisodeSelector {...defaultProps} />);

    const select = screen.getByRole("combobox", {
      name: /select episodes to compare/i,
    });
    await user.click(select);

    const option = screen.getByRole("option", { name: "Episode 3" });
    await user.click(option);

    expect(mockOnSelectEpisodes).toHaveBeenCalledWith([1, 2, 3]);
  });

  it("handles episode deselection", async () => {
    const user = userEvent.setup();
    render(<EpisodeSelector {...defaultProps} />);

    const select = screen.getByRole("combobox", {
      name: /select episodes to compare/i,
    });
    await user.click(select);

    const option = screen.getByRole("option", { name: "Episode 2" });
    await user.click(option);

    expect(mockOnSelectEpisodes).toHaveBeenCalledWith([1]);
  });

  it("renders with empty selection", () => {
    render(<EpisodeSelector {...defaultProps} selectedEpisodes={[]} />);

    const select = screen.getByRole("combobox", {
      name: /select episodes to compare/i,
    });
    const selectedOptions = within(select).queryAllByRole("option", {
      selected: true,
    });
    expect(selectedOptions).toHaveLength(0);
  });

  it("is accessible", () => {
    render(<EpisodeSelector {...defaultProps} />);

    const select = screen.getByRole("combobox", {
      name: /select episodes to compare/i,
    });

    // Check for proper ARIA attributes that MUI Select uses
    expect(select).toHaveAttribute("aria-haspopup", "listbox");
    expect(select).toHaveAttribute("aria-expanded", "false");
    expect(select).toHaveAttribute("aria-labelledby", "episode-selector-label");
    expect(select).toHaveAccessibleName();
  });
});
