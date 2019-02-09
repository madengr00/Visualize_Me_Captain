# Importing the csv of data
census <- read.csv('C:\\Users\\got_a\\OneDrive\\Desktop\\Visualize_Me_Captain\\HTML\\assets\\MichaelCode\\county_census_debt_data_byState.csv')

# Renaming the rows to their respective States
row.names(census) <- census$State

# Keeping only population, house.income, percapitaincome, povertyrate,
# unemploy.rate, med.pct, student.pct, auto.pct, other.pct, totaldebt columns
# avoids a error later due to non-numeric arguments
census <- census[,c(5,6,9:14,19)]

# Creating the matrix for mathmatical manipulation and scaling the data to means
censusmatrix <- as.matrix(scale(census))

# Creating the initial heatmap according to matrix/CSV
census_heatmap <- heatmap(censusmatrix, Rowv=NA, Colv=NA, col = heat.colors(256), scale="none", margins=c(10,10))

# Creating the heatmap with dendogram, first round of statistical manipulation
# t transposes the matrix to calculate against row and column
# cor runs advanced statistical analysis (correlative) to find the dissimilarity of data
# If cor is the degree of dissimilarity, 1-cor is the desired degree of similarity
# clusters are defined by "distance" so distance is a proportional measure of similarity
hc <- hclust(as.dist(1-cor(t(censusmatrix))))

# plots the heatmap cluster (hc), i.e., the dendrogram
plot(hc)

# using the dendrogram this code rearranges the initial heatmap to its correct, dendrogramed positions
dendrogramed_heatmap <- heatmap(censusmatrix, Rowv=as.dendrogram(hc), Colv=NA, col=heat.colors(256), margins=c(10,10))
