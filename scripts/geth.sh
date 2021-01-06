geth --networkid 4224 --datadir "." --nodiscover --ws --ws.addr 127.0.0.1 --ws.port 8080 --ws.origins "*" --nat "any" --ws.api eth,net,rpc,web3,shh --shh --ipcpath "~/.ethereum/geth.ipc"

# https://www.youtube.com/watch?v=A5V2jdLi5mI