import json
import sys
import os

ROOTDIR = os.environ["ROOTDIR"]
DBUSER = os.environ["DBUSER"]
DBHOST = os.environ["DBHOST"]
DB = os.environ["DB"]
DBPASS = os.environ["DBPASS"]

default_values = {
    "viewspath": ROOTDIR+"/views",
    "resourcepath": ROOTDIR+"/dist",
    "stylepath": ROOTDIR+"/css",
    "angularpath": ROOTDIR+"/dist/firststory",
    "dbuser": DBUSER,
    "dbhost": DBHOST,
    "dbpass": DBPASS
}

def gen_be_config():
    pass

if __name__ == "__main__":
    print(sys.argv)
    if len(sys.argv) <= 1:
        print("Please specify config values")
        quit()

    command_dict = {}
    for command in sys.argv[1:]:
        command_pair = command.split('=')
        
        if command_pair[0] not in command_dict:
            command_dict[command_pair[0].strip()] = command_pair[1].strip()

    print(command_dict)
    
