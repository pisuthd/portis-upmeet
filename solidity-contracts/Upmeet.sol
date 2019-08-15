pragma solidity ^0.4.24;

import "./RelayRecipient.sol";

contract Upmeet is RelayRecipient {
    
    uint256 private eventCount = 0;
    
    struct Event {
        string title;
        string description;
        address organizer;
        address[20] attendees; // Max at 20
        uint attendeeCount;
        uint createdAt;
        uint eventAt;
        uint256 depositRate; // in Wei
        bool active;
    }
    
    mapping(uint256 => Event) events;
    
    constructor(address hub) public {
        // this is the only hub I trust to receive calls from
        init_relay_hub(RelayHub(hub));
    }

    function accept_relayed_call(address relay, address from, bytes memory encoded_function, uint gas_price, uint transaction_fee) public view returns(uint32) {
        return 0;
    }

    function post_relayed_call(address relay, address from, bytes memory encoded_function, bool success, uint used_gas, uint transaction_fee) public {
    }
    

    function addEvent(string _title, string _description, uint _eventAt, uint256 _rate) public {
        events[eventCount].title = _title;
        events[eventCount].description = _description;
        events[eventCount].active = true;
        events[eventCount].organizer = get_sender();
        events[eventCount].createdAt = now;
        events[eventCount].attendeeCount = 0;
        events[eventCount].eventAt = _eventAt;
        events[eventCount].depositRate = _rate;
        eventCount = eventCount+1;
    }
    
    function numEvent() public view returns (uint256) {
        return eventCount;
    }
    
    function getEvent(uint256 _event_id) public view returns ( string,  string, bool, address,uint, uint, uint256 ) {
        return (events[_event_id].title, events[_event_id].description, events[_event_id].active, events[_event_id].organizer, events[_event_id].createdAt, events[_event_id].eventAt, events[_event_id].depositRate);
    }
    
    function addAttendee(uint256 _event_id) public payable {
        require(msg.value >= events[_event_id].depositRate);
        uint count = events[_event_id].attendeeCount;
        events[_event_id].attendees[count] = get_sender();
        events[_event_id].attendeeCount += 1;
    }
    
    function getAttendeeNum(uint256 _event_id) public view returns (uint) {
        return (events[_event_id].attendeeCount);
    }
    
    function test(uint256 _event_id) public view returns (address) {
        return (events[_event_id].attendees[0]);
    }
    
    function getAttendee(uint256 _event_id) public view returns (address[] memory) {
        address[] memory entries = new address[](20);
        for(uint i=0; i<events[_event_id].attendeeCount; i++) {
            entries[i] = events[_event_id].attendees[i];
        }
        return (entries);
    }
    
    
    
}