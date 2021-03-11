# Road-Condition-Monitoring
RCM is a tool for gathering data from [DATEX II](https://datex2.eu/) and presenting the data in a informative and user friendly way.

## Prerequisite
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MySQL](https://www.tutorialspoint.com/mysql/mysql-installation.htm)
- Either [OpenJDK](https://openjdk.java.net/install/) or [Rust](https://www.rust-lang.org/tools/install)

## Installation


```
git clone https://github.com/SimonBerghem/Digital-Vinter.git
```

### Webserver
```
cd /Digital-Vinter/app/ or on the server cd /bin/d0020e/Digital_Vinter/app/ 
npm install
npm start
```

### RustBackend

```
cd /Digital-Vinter/backend/ or on the server cd /bin/d0020e/Digital_Vinter/backend/
cargo update
cargo build
cargo run
```
### Create Graph
 
[Instruction](https://github.com/SimonBerghem/Digital-Vinter/blob/master/app/Create_a_graph.pdf)

### Database

See [Docs](https://dev.mysql.com/doc/).


## Built With
* [Leaflet](https://leafletjs.com/) - A JavaScript library for interactive maps
* [OpenStreetMap](https://www.openstreetmap.org/#map=5/62.994/17.637) -  Free wiki world map
* [MapBox](https://www.mapbox.com/) - An open source mapping platform for custom designed maps
* [Chart.js](https://www.chartjs.org/) - Flexible JavaScript charting
* [Boundary-Canvas](https://github.com/aparshin/leaflet-boundary-canvas/) - A plugin for Leaflet mapping library to draw tiled raster layers with arbitrary boundary
* [GeoData](http://kodapan.se/geodata/data/2015-06-26/laen-kustlinjer.geo.json) - Data for county boundaries in Sweden

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Authors
* **Alex Peschel** - *Graph* 
* **Simon Malmström Berghem** - *Backend* 
* **Wilmer Thakén** - *Database/Frontend* 
* **Gustav Rixon** - *Fullstack* 




## License
[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments
Continuous work of [https://github.com/hotpucko/rcm-sommar-2019](https://github.com/hotpucko/rcm-sommar-2019). A tool built by students at Luleå University of Technology.
