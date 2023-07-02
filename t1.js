// 这个是在目录下都打包完了，，不再打包直接替换打包后的接口地址然后发布
const path = require("path");
const fs = require("fs");
const os = require(`child_process`).execSync;

let filePath = 'data/srsrecord'

//测试157
// const ip = "172.16.200.157";
// const port = "50001";
// const fileIp = "172.16.200.157";
// const filePort = "22";
// filePath = 'data/casair_nginx/html'

//测试16
// const ip = "172.16.20.16";
// const port = "50001";
// const fileIp = "172.16.20.16";
// const filePort = "22";
// filePath = 'data/smx/nginx/html'

// 社区正式
const ip = "172.16.200.165";
const port = "50001";
const fileIp = "172.16.200.165";
const filePort = "22";
filePath = 'root/jz-ytgk-prod/docker-nginx/nginx/html'

let did = `Open-IM-PC-Web-Demo`;

// setIpPort()
tToServer()

function setIpPort() {
  const p = path.resolve("./", did, "config.js");
  const old = fs.readFileSync(p).toString();
  const arr = old.split(/\n/);
  const i = arr.findIndex(v => v.match("baseUrl"));
  let proArr = arr[i].split("/")

  proArr.splice(2, 1, `${ip}:${port}`);
  let newProArr = proArr.join("/");
  arr[i] = newProArr;
  const re = arr.join("\n");
  fs.writeFileSync(p, re);
}

function tToServer() {
  os(
    `scp -P ${filePort} -r ${did} root@${fileIp}:/${filePath}`
  )
  console.log(`发布成功了：${did} ,${ip}`);
}
