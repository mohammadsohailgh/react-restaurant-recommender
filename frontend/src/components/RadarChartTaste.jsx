import RadarChart from 'react-svg-radar-chart';

function TasteRadarChart({ taste_group, data2, size, colour, colour_2 }) {
    // react radar chart
    const data = [{
        data: {
            bitter: (parseInt(taste_group[0]) - 0) / (2 - 0),
            sweet: (parseInt(taste_group[1]) - 0) / (2 - 0),
            sour: (parseInt(taste_group[2]) - 0) / (2 - 0),
            salty: (parseInt(taste_group[3]) - 0) / (2 - 0),
            savoury: (parseInt(taste_group[4]) - 0) / (2 - 0)
        },
        meta: { color: colour }
    }]
    if (data2) { data.push(data2) }
    if (colour_2) { data.push(colour_2) }

    const captions = {
        // columns
        bitter: "bitter",
        sweet: "sweet",
        sour: "sour",
        salty: "salty",
        savoury: "savoury"
    };

    const options = {
        // dots: true,
        scales: 2,
        zoomDistance: 1.2,
        axes: true
    }

    return (
        <div>
            <RadarChart
                captions={captions}
                data={data}
                size={size}
                options={options}
            />

        </div>
    )
}

export default TasteRadarChart