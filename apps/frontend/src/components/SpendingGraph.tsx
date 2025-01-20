import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useIntl } from "react-intl";
import { SpendingData } from "../types/spending";
import { useSpendingData } from "../hooks/useQueries";
import { log } from "console";

interface SpendingGraphProps {
  selectedEpisodes: number[];
}

export const SpendingGraph: React.FC<SpendingGraphProps> = ({
  selectedEpisodes,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const { data = [] } = useSpendingData();

  // Create episode map
  const episodeMap = data.reduce<Record<number, SpendingData>>((acc, item) => {
    acc[item.episode] = item;

    return acc;
  }, {});

  const filteredData = data.filter((item) =>
    selectedEpisodes.includes(item.episode)
  );

  const chartData = [
    {
      id: "spending",
      data: filteredData.map((item) => ({
        x: `Episode ${item.episode}`,
        y: item.totalSpending,
      })),
    },
  ];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: intl.formatMessage({ id: "graph.xAxis" }),
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: intl.formatMessage({ id: "graph.yAxis" }),
          legendOffset: -50,
          legendPosition: "middle",
          format: (value) =>
            intl.formatNumber(value as number, {
              notation: "compact",
              compactDisplay: "short",
            }),
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
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
        tooltip={({ point }) => {
          const episode =
            typeof point.data.x === "string"
              ? Number(point.data.x.split(" ")[1])
              : 0;
          const episodeTitle =
            typeof episode === "number" ? episodeMap[episode].title : null;

          return (
            <div className="bg-white p-2 rounded-md shadow-md">
              <strong>
                {intl.formatMessage({ id: "graph.tooltip.episode" })}:{" "}
              </strong>
              {episodeTitle ?? point.data.x}
              <br />
              <strong>
                {intl.formatMessage({ id: "graph.tooltip.spending" })}:{" "}
              </strong>
              {intl.formatNumber(point.data.y as number, {
                notation: "compact",
                compactDisplay: "long",
              })}
            </div>
          );
        }}
      />
    </div>
  );
};
