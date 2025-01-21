import { useTheme as useMuiTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useIntl } from "react-intl";
import { SpendingData } from "../types/spending";
import { useSpendingData } from "../hooks/useQueries";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { SpendingByStarship } from "./SpendingByStarship";
import { useTheme } from "../theme/ThemeContext";

interface SpendingGraphProps {
  selectedEpisodes: number[];
}

export const SpendingGraph: React.FC<SpendingGraphProps> = ({
  selectedEpisodes,
}) => {
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();
  const intl = useIntl();
  const { data = [], isLoading, isError } = useSpendingData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage messageId="error.api" />;
  }

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
      color: theme.palette.primary.main,
    },
  ];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 30, right: 110, bottom: 50, left: 80 }}
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
                fill: muiTheme.palette.text.primary,
              },
            },
            legend: {
              text: {
                fill: muiTheme.palette.text.primary,
              },
            },
          },
          grid: {
            line: {
              stroke: muiTheme.palette.divider,
            },
          },
          tooltip: {
            container: {
              background: muiTheme.palette.background.paper,
              color: muiTheme.palette.text.primary,
            },
          },
        }}
        colors={{ datum: "color" }}
        tooltip={({ point }) => {
          const episode =
            typeof point.data.x === "string"
              ? Number(point.data.x.split(" ")[1])
              : 0;
          const episodeTitle =
            typeof episode === "number" ? episodeMap[episode].title : null;

          return (
            <div
              style={{
                background: theme.palette.background.paper,
                padding: "12px",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "4px",
              }}
            >
              <strong style={{ color: muiTheme.palette.primary.main }}>
                {intl.formatMessage({ id: "graph.tooltip.episode" })}:{" "}
                {episodeTitle ?? point.data.x}
              </strong>
              <br />
              <span style={{ color: theme.palette.text.primary }}>
                <strong>
                  {intl.formatMessage({ id: "graph.tooltip.spending" })}:{" "}
                </strong>
                {intl.formatNumber(point.data.y as number, {
                  notation: "compact",
                  compactDisplay: "long",
                })}
              </span>
            </div>
          );
        }}
      />
      <SpendingByStarship data={filteredData} />
    </div>
  );
};
