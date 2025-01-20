import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useIntl } from "react-intl";
import { SpendingData } from "../types/spending";

interface SpendingByStarshipProps {
  data: SpendingData[];
}

interface TransformedData {
  episodeTitle: string;
  starships: Array<{
    name: string;
    cost: number;
  }>;
}

const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const SpendingByStarship = ({ data }: SpendingByStarshipProps) => {
  const theme = useTheme();
  const intl = useIntl();

  const COST_THRESHOLD = 500000000; // 500 million credits threshold

  // Transform data for the bar chart, excluding expensive ships
  const transformedData = data.map((item) => ({
    episodeTitle: `Episode ${item.episode}: ${item.title}`,
    starships: item.starships
      .filter((ship) => ship.cost <= COST_THRESHOLD)
      .map((ship) => ({
        name: toTitleCase(ship.name),
        cost: ship.cost,
      })),
  }));

  // Calculate total cost for each starship across all episodes
  const starshipTotalCosts = data
    .flatMap((item) => item.starships)
    .filter((ship) => ship.cost <= COST_THRESHOLD)
    .reduce((acc, ship) => {
      const titleCaseName = toTitleCase(ship.name);
      acc[titleCaseName] = (acc[titleCaseName] || 0) + ship.cost;
      return acc;
    }, {} as Record<string, number>);

  // Create and sort keys array based on total costs (highest to lowest)
  const keys = Array.from(
    new Set(
      data.flatMap((item) =>
        item.starships
          .filter((ship) => ship.cost <= COST_THRESHOLD)
          .map((ship) => toTitleCase(ship.name))
      )
    )
  ).sort((a, b) => (starshipTotalCosts[b] || 0) - (starshipTotalCosts[a] || 0));

  // Transform data into the format expected by ResponsiveBar
  const chartData = transformedData.map((item) => {
    const episodeData: Record<string, any> = {
      episodeTitle: item.episodeTitle,
    };

    // Initialize all starship costs to 0
    keys.forEach((key) => {
      episodeData[key] = 0;
    });

    // Set the actual costs for starships in this episode
    item.starships.forEach((ship) => {
      episodeData[ship.name] = ship.cost;
    });

    return episodeData;
  });

  return (
    <div className="space-y-1 pb-4">
      <div className="h-[400px] w-full">
        <ResponsiveBar
          data={chartData}
          keys={keys}
          indexBy="episodeTitle"
          margin={{ top: 50, right: 130, bottom: 160, left: 80 }}
          padding={0.3}
          groupMode="stacked"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: intl.formatMessage({ id: "graph.xAxis" }),
            legendPosition: "middle",
            legendOffset: 150,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: intl.formatMessage({ id: "graph.spending" }),
            legendPosition: "middle",
            legendOffset: -50,
            format: (value) =>
              intl.formatNumber(value as number, {
                notation: "compact",
                compactDisplay: "short",
              }),
          }}
          barAriaLabel={(e) => `${e.id}: ${e.formattedValue}`}
          label={(d) => d.id as string}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          enableLabel={true}
          labelFormat={(d) => {
            // Split long names into multiple lines with shorter width
            const words = String(d).split(" ");
            const lines = [];
            let currentLine = words[0];

            for (let i = 1; i < words.length; i++) {
              if (currentLine.length + words[i].length < 8) {
                // Reduced from 12 to 8
                currentLine += " " + words[i];
              } else {
                lines.push(currentLine);
                currentLine = words[i];
              }
            }
            lines.push(currentLine);
            return lines.join("\n");
          }}
          labelStyle={{
            fontSize: 8, // Reduced font size
            lineHeight: "1em",
            whiteSpace: "pre-wrap",
            maxWidth: "60px", // Reduced max width
            textAlign: "center",
            transform: "translateX(-50%)", // Center the text
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: theme.palette.text.primary,
                },
              },
              legend: {
                text: {
                  fill: theme.palette.text.primary,
                },
              },
            },
            grid: {
              line: {
                stroke: theme.palette.divider,
              },
            },
            tooltip: {
              container: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
              },
            },
          }}
          role="application"
          ariaLabel={intl.formatMessage({ id: "graph.starshipSpending.aria" })}
          tooltip={({ id, value, color }) => (
            <div className="bg-white p-3 rounded-md shadow-md">
              <strong style={{ color }}>
                {intl.formatMessage({ id: "graph.tooltip.starship" })}: {id}
              </strong>
              <br />
              <strong>
                {intl.formatMessage({ id: "graph.tooltip.spending" })}:{" "}
              </strong>
              {intl.formatNumber(value as number, {
                notation: "compact",
                compactDisplay: "long",
              })}
            </div>
          )}
        />
      </div>
      <div className="text-sm text-center italic -mt-6">
        {intl.formatMessage(
          { id: "graph.costThresholdNote" },
          {
            threshold: intl.formatNumber(COST_THRESHOLD, {
              notation: "compact",
              compactDisplay: "long",
            }),
          }
        )}
      </div>
    </div>
  );
};
