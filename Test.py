import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import make_interp_spline

x = np.array([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000,
              17000, 18000, 19000, 20000])


x = np.power(x, 2)

y = np.array([2, 8, 18, 32, 51, 83, 100, 129, 164, 205, 250, 291, 347, 402, 473, 516, 635, 668, 765, 823])

# plt.scatter(x, y)
#
# # Show the plot
# plt.show()


spline = make_interp_spline(x, y)

# Create an array of x values representing the curve
xnew = np.linspace(x.min(), x.max(), 500)

# Create the plot
plt.plot(xnew, spline(xnew), 'r-', x, y, 'bo')

# Show the plot
plt.show()




























