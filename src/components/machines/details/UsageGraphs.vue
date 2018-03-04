<template>
  <div>
    <site-subheader>Graphs</site-subheader>
    <hr>
    <site-subsubheader>CPU Usage</site-subsubheader>
    <graph-cpu-usage :chartData="cpuUsage" :options="{ responsive: true, maintainAspectRatio: false, animation: { duration: 0 }, elements: { line: { tension: 0 } }, hover: { animationDuration: 0 }, scales: { xAxes: [{ type: 'time', distribution: 'linear' }], yAxes: [{ type: 'linear', ticks: { min: 0, max: 100 } }]}}"/>
  </div>
</template>

<script>
import API from '@/API'
import CPUUsage from './CPUUsageGraph'
export default {
  name: 'UsageGraphs',
  created () {
    this.updateFromAPI()
  },
  methods: {
    updateFromAPI () {
      API.getMachineStatsCPUUsage((err, resp) => {
        if (err) {
          console.log(err)
        } else {
          this.cpuUsage = this.buildDataset(resp.labels, resp.data)
        }
      }, this.$route.params.vmName)
    },
    buildDataset (labels, stats) {
      return {
        labels: labels,
        datasets: [
          {
            label: '% of CPU time',
            borderColor: '#007dff',
            fill: false,
            cubicInterpolationMode: 'monotone',
            data: stats
          }
        ]
      }
    }
  },
  data () {
    return {
      s: Math.random() * 100,
      cpuGraphConfig: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        elements: {
          line: {
            tension: 0
          }
        },
        hover: {
          animationDuration: 0
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear'
            }
          ],
          yAxes: [
            {
              type: 'linear',
              ticks: {
                min: 0,
                max: 100
              }
            }
          ]
        }
      },
      cpuUsage: this.buildDataset([], [])
    }
  },
  components: {
    'graph-cpu-usage': CPUUsage
  }
}
</script>
