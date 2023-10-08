# Circuit Simulator
https://circuit-simulator.netlify.app/
<br/>
<br/>
This is a website meant for simulating the behavior of RC, RL, and LC circuit behavior through animations and graphing corresponding values in real time. <br />
## Home Page
Hovering over each button gives a preview of the circuit diagram and animation. <br />

https://github.com/nwang03/circuit-simulator/assets/43621933/e314af76-35e5-4d65-a327-872af43c0fc3
## RC Page
This is what the page looks like if the user selects "RC Circuits":
<img width="1512" alt="image" src="https://github.com/nwang03/circuit-simulator/assets/43621933/431085f2-f0f3-4831-a504-cadaef01a020">
The page showcases the basic circuit diagram on the left and an empty graph on the right.
### Canvas display
For the circuit diagram:
- the battery is represented with plus (+) and minus (-) signs
- the current is represented by the blue circles (which are electrons which travel from positive to negative) along the circuit
- the resistor is showcased by the "zig-zag" line on top, and the capacitor is shown by the red and blue plates on the right of the circuit
- the extra line near the battery represents the discharge path which the user can set using the "Move Switch" button<br/>
<br/>
The green values represent the values related to the circuit, being battery voltage (volts), resistance (ohms), and capacitance (farads).<br/>
<br/>

Important values are also highlighted in the text under the circuit diagram and graph:
- The leftmost values are constants that will not change
  - The time constant is the resistance multiplied with the capacitance
- The middle values are variables related to the circuit that will change once the user starts the simulation
- The rightmost values relate to the graph:
  - x-axis is the current x value shown on the graph (seconds passed)
  - y-axis is the variable that is being graphed
  - max current is the starting current charging/discharging value of the function
  - max charge is highest the capacitor can store.
<br />

### Running the simulation
The gray buttons let the user control simulation:

- Play/Pause: start or pause the animations
- Reset: resets the animation, clears the graph, and sets all variables back to their starting values. Will automatically pause the animation.
- Move Switch: sets the state of the circuit from charging to discharging. Y-axis scaling will automatically adjust for different values due to this. Animation will automatically reset if running and pause when this is clicked.
<br />

https://github.com/nwang03/circuit-simulator/assets/43621933/3c1251b1-c5d7-4130-bb02-4b35f6c587c5
### Modifying the simulation
On the bottom, will be options that the user can adjust to change properties about the circuit or the graph. Default values are already chosen.
<br/>

<img width="770" alt="image" src="https://github.com/nwang03/circuit-simulator/assets/43621933/29cecf67-fd35-4a29-869c-4171d48414cd">
<br />

Changing **ANY** of these values will automatically reset the simulation, and automatically scale the y-axis.

- The radio buttons represent what the user wants graphed on screen.
- the time increase per frame slider adjusts how many seconds are increased per frame that the animation is running. The animation will run faster if this value is increased and vice versa.
- the input boxes represent the properties of the circuit the user can change, which will affect how fast the current charges/discharges and to what values.
- the drag down menu changes the scaling for the x-axis on the graph. By default, the graph only shows intervals of 450 seconds (for example, 0-450, then 450-900, and so on). Users can adjust this with the x-axis range value.
<br />

https://github.com/nwang03/circuit-simulator/assets/43621933/d80cd47d-d64b-40a0-93c6-16d127d9bcf0

## RL Page
This is what the page looks like if the user selects "RL Circuits":

https://github.com/nwang03/circuit-simulator/assets/43621933/d4a0f850-c27e-4fdd-ab91-ca8145b382b5

Functionality is identical to the RC page, with minor differences:
- The capacitor is replaced by an inductor
- Many measured values are different, namely:
  - Inductance
  - Magnetic field energy
  - Change in the current per time (dI/dt)

## LC Page
This is what the page looks like if the user selects "LC Circuits":

https://github.com/nwang03/circuit-simulator/assets/43621933/58780d65-4543-483d-b0f8-cbe6e8404e15

Functionality is identical to the RC page, with minor differences:
- Inductor and capacitor in the circuit
- Many measured values are different, namely:
  - Max capacitor charge
  - Cycle period
  - Electric and magnetic field energy

## Top NavBar
The top navbar contains a dragdown menu allowing the user to switch circuit pages, click on the leftmost logo to return to the home page, or the github repo to be sent to this repository.

https://github.com/nwang03/circuit-simulator/assets/43621933/b2de5319-7a97-40b8-9237-981e3fc8dae3
